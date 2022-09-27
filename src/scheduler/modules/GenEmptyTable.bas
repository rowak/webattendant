Attribute VB_Name = "GenEmptyTable"

' For getting rid of borders, the code from an unkown user helped
' It should be the second response on the page, and just says to use xlNone
' https://stackoverflow.com/questions/6974965/how-to-remove-borders-from-cells-in-a-range-in-excel-using-vb-net

Sub GenEmptyTable()
    With Worksheets("Schedule")
        ' Setting up schedule formatting
        .Range("A1", "G33").ClearContents
        .Range("A1", "G33").Interior.Color = xlNone
        .Range("A1", "G33").Font.Color = vbBlack
        .Range("A1", "G33").Borders.LineStyle = xlNone
        .Range("A1", "F2").Font.Bold = True
        .Range("A1", "F2").HorizontalAlignment = xlCenter
        .Range("B1").Value = "Monday"
        .Range("C1").Value = "Tuesday"
        .Range("D1").Value = "Wednesday"
        .Range("E1").Value = "Thursday"
        .Range("F1").Value = "Friday"
        .Range("A2").Value = "Time"
        ' Create date object to hold course slot time and generate all possible times from 8am to 11pm
        Dim t As Date
        Dim i As Integer
        Dim displayTime As String
        t = "8:00am"
        ' Create blocks of 30 min intervals
        For i = 0 To 30
            displayTime = Format(t, "hh:nnAM/PM")
            .Range("A" & (i + 3)).Value = displayTime
            t = DateAdd("n", 30, t)
        Next i
        ' Center weekday name headers
        .Range("A1", "F2").HorizontalAlignment = xlCenter
    End With
End Sub
