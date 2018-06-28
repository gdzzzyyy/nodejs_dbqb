echo on

set __server=192.168.18.14
set __password=123456

pushd "%~dp0"

set zipname=%random%.zip
echo compress package %zipname%
7z a %zipname% -tzip -mx2 ../weapp > nul

echo wait 1s
ping 127.0.0.1 -n 1 > nul

if exist %zipname% (
  echo upload package %zipname%
  echo y|pscp -pw %__password% %zipname% root@%__server%:/tmp/ds.zip
  del %zipname% /F /Q
) else (
  echo file not exist %zipname%
  exit /b -1
)

echo execute shell script...
set "errorlevel="
echo y|plink -pw %__password% root@%__server% -m upload.txt > nul

IF %ERRORLEVEL% NEQ 0 goto ErrorLabel

goto Success

:ErrorLabel
echo Error!
pause

:Success
popd