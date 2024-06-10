# Wallhaven Desktop

**This project is not owned by wallhaven.cc, we just use their API.**

<img width="1205" alt="image" src="https://github.com/luisflorido/wallhaven-desktop/assets/7344056/5079558e-5f0e-4cbf-8019-3fb24dbcf012">

# How to use

You can download the application in [this link](https://github.com/luisflorido/wallhaven-desktop/releases)
In order to setup the only thing that you need to do is get your API Key [here](https://wallhaven.cc/settings/account) and set on Settings page inside the desktop application.
<img width="1202" alt="image" src="https://github.com/luisflorido/wallhaven-desktop/assets/7344056/91908006-b99d-4c62-a32d-ec2d4682fba8">

# Mac OS Usage
When you try to install the app on recent versions of Apple systems, they add a "Quarantine" attribute because it doesn't have the required certification process (it costs "only" $100 per year).

You can use this command to remove and run the application normally:
`xattr -d com.apple.quarantine <app path>`

Issue thread: https://discussions.apple.com/thread/253714860?answerId=257037956022&sortBy=best#257037956022


## TODO

- [X] Download progress
- [ ] File hash validation to avoid having broken images
- [ ] Background download (not download instantly which is now)
- [ ] Try download and remove files again if any error happens
- [ ] Re-download images if not in folder
