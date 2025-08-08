@echo off
pushd %~dp0
set PROG_DIR=%CD%
popd
js %PROG_DIR%\main-banana.js %*
