Attribute VB_Name = "TestModule1"
Option Explicit
Option Private Module

'@TestModule
'@Folder("Tests")

Private Assert As Object
Private Fakes As Object

'@ModuleInitialize
Private Sub ModuleInitialize()
    'this method runs once per module.
    Set Assert = CreateObject("Rubberduck.AssertClass")
    Set Fakes = CreateObject("Rubberduck.FakesProvider")
End Sub

'@ModuleCleanup
Private Sub ModuleCleanup()
    'this method runs once per module.
    Set Assert = Nothing
    Set Fakes = Nothing
End Sub

'@TestInitialize
Private Sub TestInitialize()
    'This method runs before every test in the module..
End Sub

'@TestCleanup
Private Sub TestCleanup()
    'this method runs after every test in the module.
End Sub

'@TestModule
Private Sub GenEmptyTableTestCase()
    On Error GoTo TestFail
    
    Dim Actual As Boolean
    Actual = FunctionCollection.GenEmptyTable()
    Assert.isTrue Actual, "This test should return True"
    Assert.Succeed
TestExit:
    Exit Sub
TestFail:
    Assert.Fail "Test raised an error: #" & Err.Number
    
End Sub

'@TestModule
Private Sub GenTableTestCase()
    On Error GoTo TestFail
    
    Dim Actual As Boolean
    Actual = FunctionCollection.GenTable()
    Assert.isTrue Actual, "This test should return True"
    Assert.Succeed
TestExit:
    Exit Sub
TestFail:
    Assert.Fail "Test raised an error: #" & Err.Number
    
End Sub

'@TestModule
Private Sub GenerateCourses()
    On Error GoTo TestFail
    
    Dim Actual As Boolean
    Actual = FunctionCollection.GenCourses()
    Assert.isTrue Actual, "This test should return True"
    Assert.Succeed
TestExit:
    Exit Sub
TestFail:
    Assert.Fail "Test raised an error: #" & Err.Number
    
End Sub

'@TestMethod("Uncategorized")
Private Sub TestMethod1()                        'TODO Rename test
    On Error GoTo TestFail
    
    'Arrange:

    'Act:

    'Assert:
    Assert.Succeed

TestExit:
    Exit Sub
TestFail:
    Assert.Fail "Test raised an error: #" & Err.Number & " - " & Err.Description
    Resume TestExit
End Sub

