# Project overview
## Programming language
- node.js: v20.12.0
  - https://nodejs.org/en/download
- typescript: v5.4.3

## Design concept
- This project uses nodejs and typescript because everyone seems to have this experience so far and easy to understand codes
- Developed the parser function as module, so it is easy to implement the function to both of `CUI` and `GUI`

## Project structure
```
ts-file-validater/
│
├── build/ ... This stored binary files
│   ├── mpegts-parser-linux
│   ├── mpegts-parser-macos
│   └── mpegts-parser-win.exe
│
├── dist/
│   └── mpegts-parser.js/ ... javascript run file
│
├── src/
│   ├── cli/ ... Root file for cli
│   ├── core/ ... Logic that can be shared with cui/gui
│   │   ├── error/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   └── gui/ ... Files for gui (Not implemented! For the future)
│       ├── server.ts
│       └── controller/
│
├── test/
│
└── .gitignore
```

## Compile and Execution
To build/compile the source codes, you need to install node to your laptop. Please download and install `v20.12.0` from the official node download website.
- https://nodejs.org/en/download

Running the below command to check your installation success.
```shell
node -v
```
See if the command line shows result as follows.
```
v20.11.1
```

Next, change your directory to this project root.
```shell
cd path/to/ts-file-parser
```

Firstly, you need to install npm packages to build. Please run the below command and install npm modules locally.
```shell
npm install
```
Note: Here is the one moderate vulnerability warning. This vulnerability will be a problem if you share your PC with other people.  
For this technical test, there is no serious impact by this issue. So please kindly let me use as it is to reduce work volume.

Now you can build a binary by following command. Please run them.
```shell
npm run compile_cli
npm run build_cli
```

After that, binary files created under the `build` directory. Let's move on there.
```shell
cd ./build
```

You can see 3 x binary files for mac, windows and linux. To run the below command to execute the mpegts-parser binary file to check the functionality.

### For Mac users
```shell
./mpegts-parser-macos /path/to/your/testfile.ts
```

### For Windows users
Open your PowerShell, move to the `build` directory and run the below command.
```shell
.\mpegts-parser-win.exe /path/to/your/testfile.ts
```
