---
layout: post
title:  "Compiling Speex.framework in Xcode"
date:   2017-03-18 19:20:00 +1100
categories: posts
---

To expand on the networking and C socket programming knowledge I picked up in uni, I wanted to try implement a P2P VoIP feature for use in some future game ideas. After researching for some audio codecs, "Speex" seemed like a fitting option for the project.

But how will I use this library in my future Xcode Projects? 🤔

After some trial and error these are the steps I used to build a framework file.

---

<br>
### Downloading Speex

- Download the .git source of Speex (comes with macosx folder with an Xcode project file).

    <https://git.xiph.org/?p=speex.git;a=summary>
    I downloaded the version under:
    tags -> Speex-1.2.0 -> snapshot. (a tar.gz file)
    …some other versions are available here also.

    Dev release also available on Github:
    <https://github.com/xiph/speex>

- Unpack the tar.gz file.
- Navigate to folder in terminal.
- Create the config.h file by following the INSTALL file. (Don't need to run make/make install)

```
./autogen.sh
```
> If you do not have 'automake' installed you will get a “can’t run alocal” error here.
> I installed this with homebrew -    brew install automake
> (this will allow you to run the ./configure as you would normally to create a config.h file).

```
./configure
```

The folder should now contain a `config.h` file, we need to compile the framework.
This config.h file configures compile options for the Speex source and header files.


<br>
### Building the .framework

- Open the Xcode project file found here: (I am using Xcode Version 8.2.1 (8C1002)

    **macosx/Speex.xcodeproj**

- Copy the created `config.h` file into the open Xcode project.
- Find the prefix header file inside the Xcode project
    `Source/Speex_Prefix.pch`
- Add the line
    `#define HAVE_CONFIG_H`

This tells the other header and source files that a config.h file is available to be used when compiling.

>The prefix header file (.pch) should already be added to the Speex.framework target in the build settings.

>TARGETS -> Speex -> Build Settings -> Apple LLVM 8.0 - Language -> Prefix Header

<br>
Try to build the framework and you will receive an error:
“The run destination My Mac is not valid for Running the scheme “Speex”.

- Select the desired Base SDK for the project:

    *PROJECT -> Build Settings -> Architectures -> Base SDK -> Select SDK*

    in my case **Latest macOS (macOS 10.12)**

- Build the framework again. (you will notice there is a choice for either My Mac (64-bit) or My Mac (32-bit) when you build.

<br>
You should now have successfully built the Speex.framework file. 👏
{:.center}


<br>
### Using the .framework

- Saving built framework for convenience _(optional)_:

After build has finished (assuming no major errors occurred)…
Navigate to your Speex-1.2.0 folder -> macosx -> Build -> Products -> Development -> Speex.framework.
I copied my framework file and added it to /Library/Frameworks/ (where I have other installed framework files for ease of access).

- Using the .framework in your Xcode projects:

    *Under project settings -> SELECT TARGET -> Build Phases -> Link binary with libraries*

    **Add Other...** (select the Speex.framework file)

<br>
You should then be able to use the framework in your projects like so:
```
#include <speex/speex.h>
```
