#!/bin/bash
# Build the app locally
expo prebuild --clean

# We do not support ios anyway
# expo run:ios
expo run:android

# Or create a development build (provided you have expo-dev-client installed and set up)
eas build


echo "Press any key to exit..."
read -n 1 -s -r -p ""  # Wait for any key press