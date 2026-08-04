---
title: Next Steps
timestamp: 2026-06-23 06:54:00
keywords:
  - coding
author: Mika
description: What's next?
header-image: 
---

Okay, now I'm getting somewhere - you may have noticed the links to the last few posts appearing on the right hand sidebar, which hides itself happily when you're on mobile (or strictly speaking, does not render).  So definitely at Minimum Viable Blog now... so what's next in my brain?

### Styling
Currently I'm using applying much of any styling to the actual markdown content (or the site as a whole) and it feels like a good time to start tweaking that.
* I really want to find a nice font first - something easy on the eye and san-serif.
* Update the bullet style to match the sidebar.
* make the content keywords more distinct (as well as make them linkable - see below).
* I have a header-image field set in my MD metadata... I should do something with it.  And figure out an elegant image-routing bit.

### Archives
The more techy-side - I want to add an archives page - likely pages with links to previous posts.  I'd also like it to populate a list of all the keywords I've used, and for clicking of those to go to a filtered view.  Hopefully simple enough - building the additional page view is most of the work there, then defining /archive/ and /archive/*keywords* as React Routes.

### Persistence and Comments
At some point I'll likely source the blogpost data from a self-hosted server - a simple REST frontend ontop of some flavour of nosql/sqlite DB.  Of course I'll then need tools to write to it - I'll likely just extend the REST interface to a static site with a markdown editor and lock that down *somehow*.

Comments are likely going to be farmed out to fediverse/blusky threads - this seems the easiest way to avoid horrible spam and it doesn't seem too hard to embed.  As a bonus if I have the REST service up and running I can deal with any auth issues there (or *something*).

### RSS feed
I probably should have one.
