## Ember Addon: Configure Windows for Ember Cli Performance
Dramatically improve build speed during `ember build` and `ember serve`!

Ember and Ember Cli are some of the best tools for the development of sophisticated web applications. A lot of its magic is in the automatic build tool, which also allows for incremental builds during development. Those builds can be a bit slow on Windows - correct configuration of Windows Defender and the Windows Search Index improve the speed dramatically. Made with :heart: by Microsoft. This addon includes [ember-cli-windows](https://github.com/felixrieseberg/ember-cli-windows) in your Ember Cli project and instructs Windows users to configure their system for optimized speed.

To install, run:
```
npm install --save-dev ember-cli-windows-addon
```

To use, run:
```
ember windows
```

If you get a PSSecurityException, you may need to run the following command using PowerShell:
```
Set-ExecutionPolicy Unrestricted -scope Process
ember windows
```

## Run Ember Cli as Administrator
Additional performance can be gained by using an elevated prompt, which can be achieved by starting PowerShell or CMD ‘as Administrator’. If you do not have administrative rights on your machine, see the [Ember Cli section on symlinks](http://www.ember-cli.com/user-guide/#symlinks-on-windows) for information on how to enable additional performance gains.

## Requirements
Windows 10, 8.1, or 8 are heavily recommended. Windows 7 is supported, but we urge you to upgrade.

## License
MIT License, Copyright 2015 Felix Rieseberg & Microsoft. See LICENSE for more information.
