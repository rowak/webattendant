Attribute VB_Name = "DaysFunctions"
' A function that will return the percentage of a day that is occupied
' Give it the column value
Function dayPercent(column As String) As Double
    Dim acc As Double
    Dim i As Integer
    Const timeEnd As Double = 33
    Const timeStart As Double = 3
    acc = 0
    
    If column <> "" Then
        For i = CInt(timeStart) To CInt(timeEnd)
            With Worksheets("Schedule").Range(column & i)
                If .Interior.ColorIndex <> xlNone Then
                    acc = acc + 1#
                End If
            End With
        Next i
    Else
        acc = timeEnd - timeStart
    End If
    acc = Round(acc / (timeEnd - timeStart), 4)
    dayPercent = acc
End Function

Function lowestDay() As String
    Dim day As String
    Dim curr As Double
    Dim lowest As Double
    ' While these would be good for an array, VBA doesn't really support constants as an array
    Const mon As String = "B"
    Const tues As String = "C"
    Const wed As String = "D"
    Const thur As String = "E"
    Const fri As String = "F"
    
    ' Start with monday as the smallest
    ' Must calculate percentage for monday
    day = "Mon"
    lowest = dayPercent(mon)
    
    ' Now check if tuesday is smaller
    curr = dayPercent(tues)
    If curr < lowest Then
        day = "Tues"
        lowest = curr
    End If
    
    ' Wednesday
    curr = dayPercent(wed)
    If curr < lowest Then
        day = "Wed"
        lowest = curr
    End If
    
    ' Thursday
    curr = dayPercent(thur)
    If curr < lowest Then
        day = "Thur"
        lowest = curr
    End If
    
    ' Friday
    curr = dayPercent(fri)
    If curr < lowest Then
        day = "Fri"
        ' This is the final one, so lowest no longer matters
    End If

    lowestDay = day
End Function

Function checkConflict(row As Integer) As Boolean
    Dim start As Integer
    Dim fin As Integer
    Dim col As String
    Dim day As Variant
    Dim i As Integer
    Dim result As Boolean
    
    result = False
    
    ' Check if row is valid
    If row <= 1 Then
        result = True
    End If
    
    Dim courseCode As String
    Dim sectionCode As String
    Dim meetingType As String
    Dim daysOfWeek As String
    Dim startTime As String
    Dim endTime As String
    
    meetingType = ""
    
    If result = False Then
    ' Assign Variables
        With Worksheets("Data")
            courseCode = .Range("A" & row).Value
            sectionCode = .Range("C" & row).Value
            meetingType = .Range("E" & row).Value
            daysOfWeek = .Range("F" & row).Value
            startTime = .Range("G" & row).Value
            endTime = .Range("H" & row).Value
        End With
    End If
    
    If result = False And meetingType <> "EXAM" Then
        start = PlotMeeting.getTimeRow(startTime)
        fin = PlotMeeting.getTimeRow(endTime)
        ' Checking if time range is valid
        If start <> 34 And fin <> 34 Then
            For Each day In Split(daysOfWeek, ",")
                col = PlotMeeting.getColumn(CStr(day))
                ' Checking if the current day of the week is valid
                If col <> "G" Then
                    For i = start To fin
                        ' A more condensed version of the previous plotMeeting function
                        If Worksheets("Schedule").Range(col & i).Interior.ColorIndex <> xlNone Then
                            result = True
                        End If
                    Next i
                End If
            Next day
        End If
    End If
    
    checkConflict = result
End Function

' Given a row number, it will check if the rows after that share the same
' name and course code generate any conflicts.
' Exams will get ignored
' Eg, line 2 has ACCT*1220 and 0101
'       It will check if line 2 and line 3 generate conflicts
'       Line 4 is an exam so it gets ignored
'       Stops on line 5 because the section code is different
Function checkCourseConflict(rowStart As Integer) As Boolean
    Dim courseCode As String
    Dim sectionCode As String
    Dim nextCode As String
    Dim nextSection As String
    Dim i As Integer
    Dim result As Boolean
    result = False
    
    If rowStart <= 1 Then
        result = True
    End If
    
    ' Reads the necessary data from the row to check if it changes
    If result = False Then
        courseCode = Worksheets("Data").Range("A" & rowStart).Value
        sectionCode = Worksheets("Data").Range("C" & rowStart).Value
        ' To start off, these are set to the current entry
        nextCode = courseCode
        nextSection = sectionCode
    
       ' Must be a course, in case it goes too far
        If courseCode = "" Then
            result = True
        End If
    End If
    
    If result = False Then
        ' Set i equal to the first row
        i = rowStart
        ' Checks if the course code and section code grabbed are the same
        While nextCode = courseCode And nextSection = sectionCode And result = False
            ' Check if the row generates a conflict
            If checkConflict(i) = True Then
                result = True
            End If
            ' Go to the next row and set what that row's code and section are
            i = i + 1
            nextCode = Worksheets("Data").Range("A" & i).Value
            nextSection = Worksheets("Data").Range("C" & i).Value
        Wend
    End If
    
    ' Returns what result was grabbed
    checkCourseConflict = result
End Function

' Function that checks if a given course row does not have any meetings times in the ignoredDays array
' If valid course return true
Function checkIgnoredDays(rowStart As Integer, ByRef ignoredDays() As String) As Boolean
    Dim courseDays As String
    Dim i As Integer
    Dim sectionCode As String
    Dim sameSection As Boolean
    Dim courseCode As String
    Dim newRow As Integer

    sectionCode = Worksheets("Data").Range("C" & rowStart).Value
    courseCode = Worksheets("Data").Range("A" & rowStart).Value
    checkIgnoredDays = True
    
    'loop through all days provided
    For i = 0 To UBound(ignoredDays)
    'Loop through all LABS, SEMS, LECS to make sure none have meetings on specified day(s)
        newRow = rowStart
        sameSection = True
        Do While sameSection = True
            courseDays = Worksheets("Data").Range("F" & newRow).Value
            ' If the courseDays string contains the day, return false (failure case)
            If InStr(courseDays, ignoredDays(i)) <> 0 Or courseDays = "TBA" Then
                checkIgnoredDays = False
                Exit Function
            End If
            ' Check if the next row is the same section
            newRow = newRow + 1
            If sectionCode <> Worksheets("Data").Range("C" & newRow).Value Or courseCode <> Worksheets("Data").Range("A" & newRow).Value Then
                sameSection = False
            End If
        Loop
    Next i
End Function

'return the row number first section of a random course in the data sheet
Function getRandomCourse() As Integer
    Dim foundFirst As Boolean
    foundFirst = False
    Dim sectionCode As String
    Dim courseCode As String
    Dim randomCourseRow As Integer
    randomCourseRow = Int(2 + Rnd * (6608))

    
    
    courseCode = Worksheets("Data").Range("A" & randomCourseRow).Value
    Do While foundFirst = False
        'edge case for first row in sheet
        If randomCourseRow = 1 Or randomCourseRow = 2 Then
            getRandomCourse = 2
            Exit Function
        End If
        sectionCode = Worksheets("Data").Range("C" & randomCourseRow).Value
        If courseCode <> Worksheets("Data").Range("A" & randomCourseRow - 1).Value And Worksheets("Data").Range("C" & randomCourseRow - 1).Value <> sectionCode Then
            foundFirst = True
        Else
            randomCourseRow = randomCourseRow - 1
        End If
    Loop
    getRandomCourse = randomCourseRow
End Function

Function containsLowestDay(row As Integer, day As String) As Boolean
    Dim i As String
    Dim pos As Integer
    Dim result As Boolean
    Dim courseCode As String
    Dim sectionCode As String
    Dim curCourse As String
    Dim curSection As String
    
    courseCode = Worksheets("Data").Range("A" & row).Value
    sectionCode = Worksheets("Data").Range("C" & row).Value
    result = False
    i = row
    curCourse = courseCode
    curSection = sectionCode
    If courseCode <> "" Then
        While (curCourse = courseCode And sectionCode = curSection) And result <> True
            pos = InStr(Worksheets("Data").Range("F" & i).Value, day)
            If pos <> 0 And Worksheets("Data").Range("E" & i).Value <> "EXAM" Then
                result = True
            End If
            i = i + 1
            curCourse = Worksheets("Data").Range("A" & i).Value
            curSection = Worksheets("Data").Range("C" & i).Value
       Wend
    End If
    
    containsLowestDay = result
End Function

Function getLowestDayCourse() As Integer
    ' TODO: write a function that returns the ROW NUMBER of a course that occurs
    '       on the day with the least number of courses (using lowestDay())
    Dim day As String
    Dim courseFound As Boolean
    Dim courseRow As Integer
    Dim found As Integer
    
    ' Find lowest day and say we haven't found the course
    courseFound = False
    day = lowestDay()
    ' Default to first entry
    found = 2
    
    While courseFound = False
        ' Get a random course
        courseRow = getRandomCourse()
        ' Check if it contains the lowestDay
        If containsLowestDay(courseRow, day) = True Then
            ' check for conflicts
            If checkCourseConflict(courseRow) = False And Worksheets("Data").Range("B" & courseRow).Value = "Open" Then
                found = courseRow
                courseFound = True
            End If
        End If
    Wend
    
    getLowestDayCourse = found
End Function

Function getNoTuesThurs() As Integer
    Dim randomCourse As Integer
    Dim validCourse As Boolean
    validCourse = False
    Dim Days(0 To 1) As String
    Days(0) = "Tues"
    Days(1) = "Thur"
    Do While validCourse = False
        randomCourse = getRandomCourse()
        If checkCourseConflict(randomCourse) = False And checkIgnoredDays(randomCourse, Days) = True Then
            validCourse = True
            Exit Do
        End If
    Loop
    getNoTuesThurs = randomCourse
End Function

Sub DaysFunctions()
'for debugging
    'Worksheets("Schedule").Range("A34").Value = lowestDay()
' B35 should be the starting row of a course
    'Worksheets("Schedule").Range("B34").Value = checkCourseConflict(CInt(Worksheets("Schedule").Range("B35").Value))
End Sub

