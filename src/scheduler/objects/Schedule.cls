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
    Set KeyCells = Range("H5:I9")

    If Not Application.Intersect(KeyCells, Range(Target.address)) _
            Is Nothing Then
        With Worksheets("Schedule")
            For i = 3 To 7
            .Range("H" & (i + 2), "I" & i + 2).Interior.ColorIndex = i
            Next i
        End With
        If isValid(Target) Then
            Call GenEmptyTable.GenEmptyTable
            Call GenTable.GenTable
        End If
    End If
End Sub

Function isValid(Target As Range) As Boolean
    Dim row As String
    Dim col As String
    Dim address() As String
    address = Split(Target.address, "$")
    If ArrayLen(address) = 3 Then
        col = Split(Target.address, "$")(1)
        row = Split(Target.address, "$")(2)
    Else
        isValid = True
        Exit Function
    End If
    If col = "H" And Worksheets("Schedule").Cells(row, "I") <> "" Then
        isValid = True
    ElseIf col = "I" And Worksheets("Schedule").Cells(row, "H") <> "" Then
        isValid = True
    Else
        isValid = False
    End If
End Function

Function ArrayLen(arr As Variant) As Integer
    ArrayLen = UBound(arr) - LBound(arr) + 1
End Function
