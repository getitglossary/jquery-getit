# jquery-getit
jQuery plugin for accessing definitions from the GET-IT glossary

For more information please [visit our page](http://getitglossary.github.io/jquery-getit/)
  
  
###About this plugin
This __jQuery__ plugin allows you to connect any website to the [GET-IT Glossary](http://getitglossary.org/) of definitions of medical terms. It is easy to use and will scan web page copy for tagged terms.
  
  
###Plugin installation
You can install the plugin from the commandline using __Bower__ or __NPM__ or simply download this repository and copy the __dist__ folder into your web site javascript folder.
  
####Manual installation

Download the tarball then copy all the files from /dist/ into your scripts and css folders. Be sure to add in a call to jQuery as well as the getit script in the header section of your site.
  
####Installing with Bower

Run this command from the root of your website:

    bower install getitglossary/jquery-getit

####Installing with NPM (Node Package Manager)

Run this command from the root of your website:

    npm install getitglossary/jquery-getit
  
  
###Preparing your website copy
__jquery-getit__ will parse through the page (or a specific element, eg. __.main-content__) and look for text that is wrapped with a __cite__ tag. If this text matches a term in the GET-IT Glossary, or if it has an attribute of __data-term__ then __jquery-getit__ will style this term and link a popup to it that provides the user with a detailed definition and links to the GET-IT Glossary.

Examples:  
Text is the same as the term. The plugin is not case-sensitive so will match both 'Certainty' and 'certainty'  
  
`<cite>certainty of the evidence</cite>`

Text is different or a variation of the term. Use the __data-term__ attribute to specify which term to link to. There is a small performance benefit to be gained from always using the data-attribute.  
  
`<cite data-term="Number Needed to Harm">NNH</cite>`

You can view a table of current terms, here:  
[List of terms in the __GET-IT Glossary__](http://getitglossary.org/dev/terms)
  
  
###Initialising and running the plugin
  
#####Option: Glossary
This will nominate a specific instance of the GET-IT Glossary for the plugin to link to. This is useful for international or audience-specific versions of the glossary (eg. __espanol__ or __kids__). If this is not set, the Glossary will default to the main instance at (http://getitglossary.org).

#####Option: Style
You can customise the __cite__ link style. We recommend differentiating it from standard web links, either through the use of an accent colour or alternative styling, eg. dashed underline, box, bold or italic type.
  
  
###Plugin initialisation examples
Initialise the plugin and scan the target element for `<cite>` tags:  
`$('.element').getit();`

Initialise the plugin with the Spanish version of the Glossary:  
`$('.element').getit({
  glossary: 'es.getitglossary.org';
});`
  
  
###Authors and Contributors
Developer: Robin Layfield (@ultrasimplified)   
Producer: Douglas Badenoch  
Designer: Tom Brooks
  
  
###Support or Contact
Having trouble with this plugin? [contact support] or raise an issue in the [Github repository](https://github.com/getitglossary/jquery-getit) and we’ll help you sort it out.
