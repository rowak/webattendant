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

Sub DaysFunctions()
    Worksheets("Schedule").Range("A34").Value = lowestDay()
End Sub
