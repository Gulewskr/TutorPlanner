#!/bin/bash
# Build the app locally

# TODO - enable clean before build + create default gradle config which will be copied before run
# expo prebuild --clean

# We do not support ios anyway
# expo run:ios
expo run:android

# Or create a development build (provided you have expo-dev-client installed and set up)
eas build


echo "Press any key to exit..."
read -n 1 -s -r -p ""  # Wait for any key press