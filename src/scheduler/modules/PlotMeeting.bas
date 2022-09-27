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
    'default return value is True for successful plot, set to false on error
    PlotMeeting = True
    
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
                            .Value = courseCode & " " & sectionCode
                            .Borders(xlEdgeTop).LineStyle = xlContinuous
                            ' Add thicker border if block is exam
                            If meetingType = "EXAM" Then
                                .Borders(xlEdgeTop).Weight = xlThick
                            End If
                        ' If cell is under block starting time then display meeting type
                        ElseIf i = (start + 1) Then
                            .Value = meetingType
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
    
End Function
