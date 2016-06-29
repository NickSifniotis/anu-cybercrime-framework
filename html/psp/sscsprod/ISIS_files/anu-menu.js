// version 4.6 

function checkMenu(){
    if(!document.getElementsByTagName||!document.childNodes) { return; }

    var returnval = 1;
  
    var allMenusBestMatch = "";
    var thisMatch = "";

    // For each menu block, run the getBestMatch function.  Menu blocks need to be named consecutively, nav-1, nav-2, nav-3, etc.  
    //  At most 100 will be parsed, and if nav-x is not found, the loop will stop. 
    // after the loop, we will have the menu item that best matches the current document URL.
    
    var misses = 0;
    
    for ( i = 1; i < 100 && misses < 2; i++) {

        thisMatch = getBestMatch('nav-' + i);
        
        if (thisMatch != null && thisMatch.length > allMenusBestMatch.length) {
            allMenusBestMatch = thisMatch;
            misses = 0;
        }
        
        if (thisMatch == null) {
            misses ++;
        }
        
        
    }
    
  //  document.getElementById('debugmenu').innerHTML += "<hr>Bestest ever match is " + allMenusBestMatch;
    
    // now that we have the best match, find it and expand that part of the menu.
    
    // For each menu block, run the flatMenu function.  Menu blocks need to be named consecutively, nav-1, nav-2, nav-3, etc.  
    //  At most 100 will be parsed, and if nav-x is not found, the loop will stop. 
    misses = 0;
    for ( i = 1; i < 100 && misses < 2; i++) {
        
        returnval = flatMenu('nav-' + i, allMenusBestMatch);
        
        if (returnval != 1) {
            misses ++;
        } else {
            misses = 0;
        }
    }

    
    
}

function getBestMatch(listElement) {
    rootElement = document.getElementById(listElement);
    if (rootElement == null) { return null; }
        
    // For each 'a' link in the menu, check how well it matches to the current doc URL.
    // y is an array of the 'a' links, docURL is what we try to match. 
    // matchcount is the size of the best match so far, bestmatch is the 'a' link of the best match.
  
    /*
        // we remove anything after a ? character in the documentURL before matching. 
        docURL = document.URL.replace(/\?.*$/, "");
    */
    
    docURL = document.URL;
    //remove any double // except in the http:// bit. 
    docURL = docURL.replace(/[^\:]\/\/+/, "/");

    
    //find the site base
    if (docURL.indexOf('http') == 0) {
        siteBaseEnd = docURL.indexOf('/', 8);
        if (siteBaseEnd != -1) {
            siteBase = docURL.substring(0, siteBaseEnd);
        } else {
            siteBase = "";
        }
    } else {
        siteBase = "";
    }
    
    //document.getElementById('debugmenu').innerHTML += "<hr>sitebase is " + siteBase + "<br>";
    
    matchcount = 0;
    bestmatch = "";
    y=rootElement.getElementsByTagName('a');
    
   // document.getElementById('debugmenu').innerHTML += "<hr>doc URL is " + docURL + "<br>";
        
    // Find the best match for the basic docURL.
    bestmatch = checkLinks(docURL, y, bestmatch, matchcount);
    
    // If the document URL ends in index.something, rerun the tests without index.something.  This is to match the 
    // case where someone has their menu item as the site root, rather than the actual full URL.     
    if (docURL.search(/index\.[^\/]+$/i) != -1) {
        docURL = docURL.replace(/index\.[^\/\?]+/i, "");

        bestmatch = checkLinks(docURL, y, bestmatch, bestmatch.length);

    }
    
    // If the document URL has a # character (i.e. the URL has an interal link on the page), rerun the matching without the # tag.
    if (document.URL.indexOf('#') >= 0) {
        docURL = document.URL;
        //remove an double slash except in the http:// part of URL
        docURL = docURL.replace(/[^\:]\/\/+/, "/");
        // remove the parameters 
        docURL = document.URL.replace(/\#.*$/, "");
        
        bestmatch = checkLinks(docURL, y, bestmatch, bestmatch.length);
        
    }
    
    // If the document URL has a question mark character (i.e. the URL has parameters), rerun the matching without parameters.
    if (document.URL.indexOf('?') >= 0) {
        docURL = document.URL;
        //remove an double slash except in the http:// part of URL
        docURL = docURL.replace(/[^\:]\/\/+/, "/");
        // remove the parameters 
        docURL = document.URL.replace(/\?.*$/, "");
        
        bestmatch = checkLinks(docURL, y, bestmatch, bestmatch.length);

    }
    
    // if no match is found do NOT select home
    if (docURL.search(/index\.[^\/]+$/i) == -1 && docURL != siteBase + "/"  && docURL != siteBase) {
	// if it matches the base of the site:
        if (bestmatch == siteBase) {
           // document.getElementById('debugmenu').innerHTML += "make it null<br>";
 
		bestmatch = "";
	}
    }
   
   // document.getElementById('debugmenu').innerHTML += "bestmatch is " + bestmatch + "<br>";
    
    return bestmatch;
    
}

function checkLinks(docURL, y, bestmatch, matchcount) {
     
    // for each 'a' element in the menu:
    for (var i=0; i < y.length ; i++) {
        
        docURLPart = docURL;
        
        // remove any trailing slash character, remove any '//', etc.
        checkAgainst = y[i].toString();
        checkAgainst = checkAgainst.replace(/\/$/, "");
        checkAgainst = checkAgainst.replace(/[^\:]\/\/+/, "/");
       
        // If the link is for 'index.something', then we will rerun the check without the index.something.  This 
        // is to try to catch more index files.  When the document URL is the site root, anything with index.something will also match.
        //  NOTE:  This might be problematic.  If a site has index.php and index.html and index.blahblahblah, the longest will probably match 
        //  all three URLS.  Not much we can do about this, as this is a bit of a hack anyway.  
        if (checkAgainst.search(/index\.[^\/]+$/i) != -1) {
            //document.getElementById('debugmenu').innerHTML += "<hr>Check has index.something, repeat without. ";
            
            checkAgainstNoIndex = checkAgainst.replace(/index\.[^\/\?]+/i, "");
            
        } else {
            checkAgainstNoIndex = "";
        }
        
        foundmatch = 0;
        safety = 0;
        
        // Start with the whole doc URL, then sucessively remove the end of the path from 
        //  the last '/' character.  Check each sucessive part of the path against the 'a' link.  
        //  
        //  e.g.  If the 'a' link is /fred/blah/, and the document URL is /fred/blah/boppity/bop, we will do the following checks:
        //   /fred/blah == /fred/blah/boppity/bop
        //   /fred/blah == /fred/blah/boppity
        //   /fred/blah == /fred/blah  (This will match and be stored as the best match, and the loop will end)
        
        // 'safety' is just to make sure that nothing goes postal.  I'm assuming that no one will have more than 100 '/' characters in a URL.
        while (foundmatch == 0 && docURLPart !=  "http:/" && docURLPart != "" && safety < 100) {
            
            //document.getElementById('debugmenu').innerHTML += "<p>doc URL Part is " + docURLPart + " safety is " + safety + " check against " + checkAgainst;
            
            safety++;
            
            if (checkAgainst == docURLPart) {
                // if the 'a' link matches, and it is a longer match than any we have seen, store it as the best.
                if (matchcount < checkAgainst.length) {
                    matchcount = checkAgainst.length;
                    bestmatch = checkAgainst;
                    
                //    document.getElementById('debugmenu').innerHTML += "<br>--- Best match found so far";
                    
                }
                foundmatch = 1;
            }
            
            
            if (checkAgainstNoIndex == docURLPart) {
                // if the 'a' link matches, and it is a longer match than any we have seen, store it as the best.
                if (matchcount < checkAgainst.length) {
                    matchcount = checkAgainst.length;
                    bestmatch = checkAgainst;
                    
                  //  document.getElementById('debugmenu').innerHTML += "<br>--- Best match found so far";
                    
                }
                foundmatch = 1;
            }
            
            if (docURLPart.indexOf('&') >= 0) {
                // remove anything from the final '&' to the end of string.
                docURLPart = docURLPart.replace(/\&[^\&]*$/, "");
            } else {
                // remove anything from the final '/' to the end of string.
                docURLPart = docURLPart.replace(/\/[^\/]*$/, "");
            }

        }
        
    }
    
    return bestmatch;
    
}


function flatMenu(listElement, bestmatch) {    
    rootElement = document.getElementById(listElement);
    if (rootElement == null) { return -1; }
    
	//Following is for systems such as WordPress which put the id='nav-x' on the div, rather than the enclosed ul.
	if (rootElement.tagName.toLowerCase() == 'div') {
		var ulWP = rootElement.childNodes;
		var ulofdiv = null;
		var ulcount = 0;
		var divindiv = null;
                
		for(var i = 0; i < ulWP.length; i++)
		{
			            
			if(ulWP.item(i).tagName != null &&
			   ulWP.item(i).tagName.toLowerCase() == 'ul')
			{
				ulofdiv = ulWP.item(i);
				ulcount ++;
			}

            if(ulWP.item(i).tagName != null &&
			   ulWP.item(i).tagName.toLowerCase() == 'div')
			{
                divindiv = ulWP.item(i);
            }
            
		}	
		
        //alert(ulcount);
        
		if (ulofdiv != null && ulcount == 1) {
			rootElement = ulofdiv;
		}
		else if (ulcount == 0 && divindiv != null) {

            var ulWP = divindiv.childNodes;

            for(var i = 0; i < ulWP.length; i++)
            {
                // alert (ulWP.item(i).tagName);
            
                if(ulWP.item(i).tagName != null &&
                   ulWP.item(i).tagName.toLowerCase() == 'ul')
                {
                    ulofdiv = ulWP.item(i);
                    ulcount ++;
                }
            }
            
            if (ulofdiv != null && ulcount == 1) {
                rootElement = ulofdiv;
            }
            
        }
        
	}
	// End changes for WordPress.
	
	
	var uls = rootElement.getElementsByTagName('UL');
    var i=uls.length;
        
    // If there is a UL, set the link above it to also have class name 'parent', then make the UL display none. 
    // This creates the >> arrows via css, and makes the whole menu structure collapse initially. 
    while (i--) {
        if(uls[i].parentNode){
            if(uls[i].parentNode.nodeName=="LI"){
                uls[i].parentNode.childNodes[0].className = (uls[i].parentNode.childNodes[0].className?(uls[i].parentNode.childNodes[0].className+' '):'') + 'parent';
            }
        }
        uls[i].style.display='none';
    }
    
    
    // create a new link.  Not sure what this is for???
    var tmpLink = document.createElement('a');
    tmpLink.setAttribute('href',document.URL);
    

    // For each 'a', check if it is the 'bestmatch' as passed in to this function.  If it is, expand out to this point. 
    
    var y=rootElement.getElementsByTagName('a');
    found = 0;
    
    for(var x=0 ; y[x] && found == 0; x++ ) {
               
        // remove any trailing slash character
        checkAgainst = y[x].toString();
        checkAgainst = checkAgainst.replace(/\/$/, "");
        
        if( checkAgainst == bestmatch ) {
            
            //found = 1;  // set found = 1; here if you only want at most 1 matching menu item to expand. 
            
            var startNode = y[x];
            var childCount = 0;
            for(var c=0; c<startNode.parentNode.childNodes.length; c++){
                if(startNode.parentNode.childNodes[c].nodeName=="UL"){
                    startNode.parentNode.childNodes[c].style.display="block";
                    childCount++;
                }
            }
            if(childCount>0){
                startNode.className = (startNode.className?(startNode.className+' '):'')+'trail';
            }
            startNode = startNode.parentNode.parentNode;
            while(startNode.parentNode) {
                if(startNode.nodeName=="UL"){
                    startNode.style.display = "block";
                }
                if(startNode.childNodes[0].nodeName=="A"){
                    startNode.childNodes[0].className = (startNode.childNodes[0].className?(startNode.childNodes[0].className+' '):'')+'trail';
                }
                startNode = startNode.parentNode;
            }
            y[x].className = (y[x].className?(y[x].className+' '):'') + 'selected';
        }
    }
    return 1;
}



checkMenu();
