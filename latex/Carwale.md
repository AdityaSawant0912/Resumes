### Things I did at Carwale
---

## Training


## Joining Frontend - Training


## First Task ES


## In View Tracking optimization

 - On the most important page of Carwale ie Model page, there are 518 Track Components. 
 - A Track component wraps its children with a `div` to have a reference, 
 It invokes tracking callbacks whenever the `div` is either viewed the first time or clicked 
 - Because of this additional `div` there were 518 of them with no semantical sense.
 - To reduce this excess DOM elements, I came up with a custom tracking hook which uses Reacts ref to listen if the element is viewed or whether it is clicked. 
 - This saved 4kb of total page size on one of most informative page.
 - Saves almost 2kb on average on rest of all pages.

## Swiper JS Minification


## Introduced counter based hashing instead of traditional hashing 
 - CarWale's inhouse Theme Library had over 1000 custom classes, Each class was represented with 6 character hash and 2 char prefix.
 - Introduced Counter based hashing reduced the bundle size by over 10%.
 - Analysized each page on Carwale to determine most used classes so that they can be hashed first to reduce DOM size.
 - Reduced DOM size by additional 6Kb on most informative page.



## Dark Theme for Native
# 60+ components
There were more than 60 React components which were to be updated to 
consume the theme.

# Used context with custom theme components
Extensive analysis was undertaken by me to perform 
literature review of what other native component libararies were doing.

# Achived theme change without reloading
The main concern of App Team was to achive this without
reloading the app. The theme change should happen without any 
loading screen or somthing else.
Creating custom theme context and custom hook was the 
key architectural decision I took to achive this.

# Massive updates to existing components
More than 250 files needed to to updated, 
Esitimated time to update them all was 2 weeks, 
With the use of promp enginering, and use of Claude 
this was achived in 2 days including bug fixes.


## 