Attribute VB_Name = "GenTable"
' Generates the schedule by plotting each meeting time on the schedule for all
' matching course sections.
Sub GenTable()
    Dim courseCode As String
    Dim sectionCode As String
    Dim meetingType As String
    Dim daysOfWeek As String
    Dim startTime As String
    Dim endTime As String
    Dim meetingDate As String
    
    Dim currCourseCode As String
    Dim currSectionCode As String
    Dim i As Integer ' represents the row number for the current course code
    Dim j As Integer ' represents the row of the current meeting
    Dim totalMeetings As Integer
    Dim validCourse As Boolean
    Dim plotSuccess As Boolean
    plotSuccess = True
    
    totalMeetings = getTotalSectionMeetings()
    ' Update the schedule for all five courses (if applicable)
    For i = 0 To 4
        currCourseCode = standardizeCourseCode(Worksheets("Schedule").Cells(i + 5, "H"))
        currSectionCode = standardizeSectionCode(Worksheets("Schedule").Cells(i + 5, "I"))
        ' Clears the invalid course error messages
        Worksheets("Schedule").Cells(i + 5, "J") = ""
        ' Search each section/meeting in the data sheet for a matching course code + section
        If currCourseCode <> "" And currSectionCode <> "" Then
            validCourse = False
            For j = 0 To totalMeetings
                courseCode = Worksheets("Data").Cells(j + 1, "A")
                sectionCode = Worksheets("Data").Cells(j + 1, "C")
                If standardizeCourseCode(courseCode) = currCourseCode And standardizeSectionCode(sectionCode) = currSectionCode Then
                    ' When a matching section is found, read all the needed section/meeting data
                    validCourse = True
                    meetingType = Worksheets("Data").Cells(j + 1, "E").Value
                    daysOfWeek = Worksheets("Data").Cells(j + 1, "F").Value
                    startTime = Worksheets("Data").Cells(j + 1, "G").Value
                    endTime = Worksheets("Data").Cells(j + 1, "H").Value
                    meetingDate = Worksheets("Data").Cells(j + 1, "I").Value
                    plotSuccess = PlotMeeting.PlotMeeting(courseCode, sectionCode, meetingType, daysOfWeek, startTime, endTime, meetingDate, i + 3)
                End If
            Next j
            If validCourse = False Then
                Worksheets("Schedule").Cells(i + 5, "J") = "Course Not Found"
                Worksheets("Schedule").Cells(i + 5, "J").Font.Color = vbRed
            End If
        End If
    Next i
    If plotSuccess <> True Then
        MsgBox "A conflict has occured conflicting boxes have been painted grey."
    End If
End Sub

' Calculates the total number of meetings in all course sections.
Function getTotalSectionMeetings() As Integer
    Dim meeting As String
    Dim numMeetings As Integer
    numMeetings = 0
    course = ""
    While meeting <> "" Or numMeetings = 0
        ' Reading from column that stores course code into numMeetings and stores number of entries in the column
        meeting = Worksheets("Data").Cells(numMeetings + 1, "A")
        numMeetings = numMeetings + 1
    Wend
    getTotalSectionMeetings = numMeetings - 1
End Function

' Sanitize user input for easier searching and input leniency
Function standardizeCourseCode(code) As String
    standardizeCourseCode = LCase(Replace(code, "*", ""))
End Function

' Prepends a 0 to the course section code to match the parsed data
Function standardizeSectionCode(code) As String
    ' Checks if there is a zero prefix in the code
    If InStr(1, code, "0") <> 1 Then
        standardizeSectionCode = "0" & code
    Else
        standardizeSectionCode = code
    End If
End Function
