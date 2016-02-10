# jquery-getit
jQuery plugin for accessing definitions from the GET-IT glossary

For detailed instructions and additional information please [visit our page](http://getitglossary.github.io/jquery-getit/)
  
  
###About this plugin
This __jQuery__ plugin allows you to connect any website to the [GET-IT Glossary](http://getitglossary.org/) of definitions of medical terms. It is easy to use and will scan web page copy for tagged terms.
  
###How it works
The plugin searches the page for __&lt;cite&gt;__ tags. When it finds a suitable tag, it parses it for a __data-term__ attribute. If it doesn't find one, it uses the __innerText__ of the tag as the term. The plugin looks up the current definition from [GET-IT Glossary](http://getitglossary.org) and crafts a hidden pop-up bubble with the definition in it. The __&lt;cite&gt;__ tag is restyled to indicate to the user that it can be clicked on.

Clicking on a marked up __&lt;cite&gt;__ tag will do two things:
* Reveal the pop-up bubble above the text
* Record a hit for the term lookup in the GET-IT Glossary

The plugin can be configured in a number of ways; the target glossary can be changed, as well as the pop-up text linking to it. This plugin can be configured to either display an alternative pop-up, or to de-cite the text in the event of a definition not being available for the term.
  
###Plugin installation
You can install the plugin from the commandline using __Bower__ or __NPM__ or simply download this repository and copy the __dist__ folder into your web site javascript folder.
  
####Manual installation

Download the tarball then copy all the files from /dist/ into your scripts and css folders. Be sure to add in a call to jQuery as well as the getit script in the header section of your site.
  

####Installing with Bower
Run this command from the root of your website:

    `bower install getitglossary/jquery-getit`


####Installing with NPM (Node Package Manager)
Run this command from the root of your website:

    `npm install getitglossary/jquery-getit`
  
  
###Preparing your website copy
__jquery-getit__ will parse through the page (or a specific element, eg. __.main-content__) and look for text that is wrapped with a __cite__ tag. If this text matches a term in the GET-IT Glossary, or if it has an attribute of __data-term__ then __jquery-getit__ will style this term and link a popup to it that provides the user with a detailed definition and links to the GET-IT Glossary.
  
###Styling the pop-ups
All the visual presentation of the pop-up and cite links can be configured by editing the attached __jquery.getit.css__ file.

###Initialising and running the plugin
Initialise the plugin and scan the target element for `<cite>` tags, in this case we are looking at all the __&lt;p&gt;__ tags but the plugin can be configured to look at a specific __.class__ or __#id__:  
`$('p').getit();`

  
###Authors and Contributors
Developer: Robin Layfield (@ultrasimplified)   
Producer: Douglas Badenoch  
Designer: Tom Brooks
