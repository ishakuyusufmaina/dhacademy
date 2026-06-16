$server = New-Object System.Net.HttpListener
$server.Prefixes.Add("http://localhost:8080/")
$server.Start()
Write-Host "Localhost server is running on http://localhost:8080/" -ForegroundColor Green

while ($server.IsListening) {
    $context = $server.GetContext()
    $response = $context.Response
    $buffer = [System.Text.Encoding]::UTF8.GetBytes("<h1>Hello World from your PowerShell Localhost!</h1>")
    $response.ContentLength64 = $buffer.Length
    $response.OutputStream.Write($buffer, 0, $buffer.Length)
    $response.Close()
}
