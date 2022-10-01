Attribute VB_Name = "PlotMeeting"

' Will get the column the day is in
Public Function getColumn(day As String) As String
    If day = Worksheets("Schedule").Range("B1").Value Or day = "Mon" Then
        getColumn = "B"
    ElseIf day = Worksheets("Schedule").Range("C1").Value Or day = "Tues" Then
        getColumn = "C"
    ElseIf day = Worksheets("Schedule").Range("D1").Value Or day = "Wed" Then
        getColumn = "D"
    ElseIf day = Worksheets("Schedule").Range("E1").Value Or day = "Thur" Then
        getColumn = "E"
    ElseIf day = Worksheets("Schedule").Range("E1").Value Or day = "Fri" Then
        getColumn = "F"
    Else
        ' If day is not Monday to Friday then set column to G to display error
        getColumn = "G"
    End If
End Function

' Function to get the row of the time.
' Expected times to be in the format hh:nnAM/PM
' If 34 is returned, time was not found
Public Function getTimeRow(time As String) As Integer
    Dim i As Integer
    Dim save As Integer
    save = 34
    
    If time <> "" Then
        ' Loops from 8am to 11pm
        For i = 3 To 32
            ' Checks if the 30 min time block is valid
            If TimeValue(time) >= TimeValue(Worksheets("Schedule").Range("A" & i).Value) And TimeValue(time) < TimeValue(Worksheets("Schedule").Range("A" & (i + 1)).Value) Then
                save = i
            End If
        Next i
    End If
    getTimeRow = save
End Function

' This subroutine plots a single meeting on the schedule.
Function PlotMeeting(courseCode As String, sectionCode As String, meetingType As String, daysOfWeek As String, startTime As String, endTime As String, meetingDate As String, cval As Integer) As Boolean
    Dim start As Integer
    Dim fin As Integer
    Dim col As String
    Dim day As Variant
    Dim i As Integer
    Dim error As Integer
    Dim attemptPlot As Boolean
    'default return value is True for successful plot, set to false on error
    PlotMeeting = True
    attemptPlot = True
    
    If meetingType = "EXAM" And Worksheets("Schedule").CheckBoxes("Check Box 21").Value <> xlOn Then
        attemptPlot = False
    ElseIf courseCode = "" Then
        attemptPlot = False
    End If
    
    If attemptPlot = True Then
        start = getTimeRow(startTime)
        fin = getTimeRow(endTime)
        ' Checking if time range is valid
        If start <> 34 And fin <> 34 Then
            For Each day In Split(daysOfWeek, ",")
                col = getColumn(CStr(day))
                ' Checking if the current day of the week is valid
                If col <> "G" Then
                    For i = start To fin
                        With Worksheets("Schedule").Range(col & i)
                            ' If the block is starting then add top border
                            If i = start Then
                                If meetingType <> "EXAM" Or .Value = "" Then
                                    .Value = courseCode & " " & sectionCode
                                End If
                                    
                                .Borders(xlEdgeTop).LineStyle = xlContinuous
                                ' Add thicker border if block is exam
                                If meetingType = "EXAM" Then
                                    .Borders(xlEdgeTop).Weight = xlThick
                                End If
                            ' If cell is under block starting time then display meeting type
                            ElseIf i = (start + 1) Then
                                If meetingType <> "EXAM" Or .Value = "" Then
                                    .Value = meetingType
                                End If
                            End If
                        
                            ' If the block is ending then add bottom border
                            If i = fin Then
                                .Borders(xlEdgeBottom).LineStyle = xlContinuous
                                ' Add thicker border if block is exam
                                If meetingType = "EXAM" Then
                                    .Borders(xlEdgeBottom).Weight = xlThick
                                End If
                            End If
                        
                            ' Add side border to any cell
                            .Borders(xlEdgeLeft).LineStyle = xlContinuous
                            .Borders(xlEdgeRight).LineStyle = xlContinuous
                            ' Add thicker border if block is exam
                            If meetingType = "EXAM" Then
                                .Borders(xlEdgeLeft).Weight = xlThick
                                .Borders(xlEdgeRight).Weight = xlThick
                            End If
                        
                            ' Colours from start to finish, and if a cell is already coloured it gets changed to grey to show a conflict
                            If .Interior.ColorIndex <> xlNone Then
                                If meetingType <> "EXAM" Then
                                    .Interior.ColorIndex = 16 ' Grey
                                    ' return false on error
                                    PlotMeeting = False
                                End If
                            Else
                                .Interior.ColorIndex = cval ' Colour of current course
                            End If
                        End With
                    Next i
                End If
            Next day
        End If
    End If
    
    PlotMeeting = True
End Function

Function PlotMeetingByRowNum(rowNum As Integer, courseColorIndex As Integer) As Boolean
    Dim courseCode As String
    Dim sectionCode As String
    Dim meetingType As String
    Dim daysOfWeek As String
    Dim startTime As String
    Dim endTime As String
    Dim meetingDate As String
    
    courseCode = Worksheets("Data").Cells(rowNum, "A").Value
    sectionCode = Worksheets("Data").Cells(rowNum, "C").Value
    meetingType = Worksheets("Data").Cells(rowNum, "E").Value
    daysOfWeek = Worksheets("Data").Cells(rowNum, "F").Value
    startTime = Worksheets("Data").Cells(rowNum, "G").Value
    endTime = Worksheets("Data").Cells(rowNum, "H").Value
    meetingDate = Worksheets("Data").Cells(rowNum, "I").Value
    
    PlotMeeting courseCode, sectionCode, meetingType, daysOfWeek, startTime, endTime, meetingDate, courseColorIndex
End Function

Sub PlotCourseByRowNum(rowNum As Integer, courseColorIndex As Integer)
    Dim courseCode As String
    Dim sectionCode As String
    Dim nextCourse As String
    Dim nextSection As String
    Dim isValid As Boolean
    Dim i As Integer
    
    courseCode = Worksheets("Data").Cells(rowNum, "A").Value
    sectionCode = Worksheets("Data").Cells(rowNum, "C").Value
    
    nextCourse = courseCode
    nextSection = sectionCode
    i = rowNum
    While nextCourse = courseCode And nextSection = sectionCode
        isValid = PlotMeetingByRowNum(i, courseColorIndex)
        i = i + 1
        nextCourse = Worksheets("Data").Cells(i, "A").Value
        nextSection = Worksheets("Data").Cells(i, "C").Value
    Wend
End Sub

