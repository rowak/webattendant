Attribute VB_Name = "ScheduleHelper"
' Returns the number of suggested courses that are needed to create a
' 5-course schedule.
Function getNeededCourses() As Integer
    Dim numCourses As Integer
    Dim currCourse As String
    For i = 5 To 9
        currCourse = Worksheets("Schedule").Cells(i, "H")
        If currCourse <> "" Then
            numCourses = numCourses + 1
        End If
    Next
    getNeededCourses = 5 - numCourses
End Function

' Adds a suggested course to the suggested courses list in the schedule helper
Sub addSuggestedCourse(newCourseRow As Integer, position As Integer)
    Dim courseCode As String
    Dim sectionCode As String
    courseCode = Worksheets("Data").Cells(newCourseRow + 2, "A").Value
    sectionCode = Worksheets("Data").Cells(newCourseRow + 2, "C").Value
    Worksheets("Schedule").Cells(position + 5, "M") = courseCode & ", " & sectionCode
End Sub

' Generate a list of suggested courses.
Sub GenerateCourses(functionType As String)
    Dim newCourseRow As Integer
    Dim neededCourses As Integer ' Number of suggested courses needed
    Dim i As Integer
    neededCourses = getNeededCourses()

    For i = 0 To neededCourses - 1
        Select Case functionType
            Case "lowestDay"
                newCourseRow = DaysFunctions.getLowestDayCourse()
            Case "noTuesThurs"
                MsgBox "Not implemented"
            Case "noEvenings"
                MsgBox "Not implemented"
            Case "noEarlyMornings"
                MsgBox "Not implemented"
            Case "noFridays"
                MsgBox "Not implemented"
        End Select
        addSuggestedCourse newCourseRow, i
        PlotMeeting.PlotCourseByRowNum newCourseRow, 16
    Next
    Call GenEmptyTable.GenEmptyTable
    Call GenTable.GenTable
End Sub

' Apply the suggested courses to the course schedule.
Sub ApplyCoursesToSchedule()
    Dim suggestedCourseSplit() As String
    Dim courseCode As String
    Dim sectionCode As String
    Dim neededCourses As Integer
    Dim i As Integer
    Dim j As Integer

    neededCourses = getNeededCourses()
    
    i = 0
    j = 0
    While i < 5
        If Worksheets("Schedule").Cells(i + 5, "H") = "" Then
            suggestedCourseSplit = Split(Worksheets("Schedule").Cells(j + 5, "M"), ", ")
            courseCode = suggestedCourseSplit(0)
            sectionCode = suggestedCourseSplit(1)
            Worksheets("Schedule").Cells(i + 5, "H") = courseCode
            Worksheets("Schedule").Cells(i + 5, "I") = sectionCode
            j = j + 1
        End If
        i = i + 1
    Wend
    
    Worksheets("Schedule").Range("M5:M9").Value = ""
End Sub
