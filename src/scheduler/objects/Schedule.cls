VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
END
Attribute VB_Name = "Schedule"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = True

' This code will automatically run. Usually it doesn't matter, but if the cells edited are those
' in the coloured regions, then it will run, re-generating the table
' Sources:
' Offical Microsoft documentation for running a function if a change occurs in cells
' https://learn.microsoft.com/en-us/office/troubleshoot/excel/run-macro-cells-change

Private Sub Worksheet_Change(ByVal Target As Range)
    Dim KeyCells As Range
    Dim i As Integer
    Set KeyCells = Range("H5:I10")

    If Not Application.Intersect(KeyCells, Range(Target.Address)) _
            Is Nothing Then
        With Worksheets("Schedule")
            For i = 3 To 7
            .Range("H" & (i + 2), "I" & i + 2).Interior.ColorIndex = i
            Next i
        End With
        Call GenEmptyTable.GenEmptyTable
        Call GenTable.GenTable
    End If
End Sub

