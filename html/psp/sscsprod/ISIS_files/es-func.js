// ===========================================================================
// Settings for ISIS Express
// ===========================================================================

var esEnableIsisExpress = false; // true|false;

var esIsisExpressApp         = "ISIS/HRMS/";
var esIsisExpressAcadHistory = "c/ANU_ISIS.ANU_ACAD_HISTORY.GBL";

// ===========================================================================
// Settings for Change Password
// ===========================================================================

var esChangePassAdminURL       = "https://doi.anu.edu.au/changeespassword/default.asp";
var esChangePassSelfServiceURL = "https://identity.anu.edu.au/";

// ===========================================================================
// Settings for esIsSelfServiceEnvironment()
// ===========================================================================

var esSelfServiceEnvRegex = new RegExp("/ps[pc]/sscs");

// ===========================================================================


function esSetIsisExpress()
{
	// ==== used by signin.html
	var docURL = document.URL;
	var msgDivId = "msg_isis_express";
	var msgClass = "msg-info";

	if( esEnableIsisExpress ) // ISIS Express is enabled
	{
		if( docURL.indexOf(esIsisExpressApp) == -1 )
		{
			// We're not already there so don't rebrand, but do show the message
			var isisExpressURL = esGetEnvURL() + esIsisExpressApp + esIsisExpressAcadHistory;

			var msgContent = '<h2>Semester 1 results</h2>';
			    msgContent += '<h3>In a hurry to see your Semester 1 2012 results?</h3>';
			    msgContent += '<p>Try <a href="'+ isisExpressURL +'" class="comments">ISIS Express</a></p>';

			esShowMessage(msgDivId, msgClass, msgContent);
		}
		else
		{
			// We're already there so rebrand
			var obj_headTitle = document.getElementById("headTitle");
			obj_headTitle.innerHTML = "ISIS Express";

			var obj_bannerTitle = document.getElementById("bannerTitle");
			obj_bannerTitle.innerHTML = "ISIS Express";

			var obj_title = document.getElementsByTagName("title")[0];
			obj_title.innerHTML = "ISIS Express";
		}
	}
}

function esGetPageTitle()
{
	var obj_title = document.getElementsByTagName("title")[0];
	var pageTitle = obj_title.innerHTML;

	return pageTitle;
}


function esSetPasswordMessage()
{
	// ==== used by passwordexpired.html
	// Note that this is called from the es-thickbox.js as it needs to be available for the thickbox JQuery
	// and calling from body onload won't work

	var msgDivId = "msg_change_password";
	var msgClass = "msg-exclamation";
	var cpURL = esGetChangePasswordURL() + "?keepThis=true&TB_iframe=true&height=700&width=800"; // Add the thickbox attributes
	var msgContent = "";

	if( !esIsSelfServiceEnvironment() )
	{
		// Admin message
		msgContent  = '<h2>Your password has expired</h2>';
		msgContent += '<p>Your Enterprise Systems (ES) password has expired and must be changed.</p>';
		msgContent += '<h3><a href="' + cpURL + '" title="" class="thickbox">Change password</a></h3>';
		msgContent += '<p>Return to log in once you have successfully changed your password if you\'re not automatically redirected.</p>';
		msgContent += '<h3><a href="' + getLogInURL() + '">Log in to ' + esGetPageTitle() + '</a></h3>';
	}
	else
	{
		// Self Service message
		msgContent  = '<h2>Your password must be changed</h2>';
		msgContent += '<p>Your password does not satisfy ANU password complexity requirements.</p>';
		msgContent += '<h3><a href="' + cpURL + '" title="" class="thickbox">Change password</a></h3>';
		msgContent += '<p>Return to log in once you have successfully changed your password if you\'re not automatically redirected.</p>';
		msgContent += '<h3><a href="' + getLogInURL() + '">Log in to ' + esGetPageTitle() + '</a></h3>';
	}

	esShowMessage(msgDivId, msgClass, msgContent);
}


function esGetChangePasswordURL()
{
	var changePasswordURL = esChangePassSelfServiceURL; // Set the self service URL by default

	if( !esIsSelfServiceEnvironment() )
	{
		// Set the admin change password URL
		changePasswordURL = esChangePassAdminURL;
	}

	return changePasswordURL;
}


function esShowMessage(divId, msgClass, msgContent)
{
	// Note that if no values are set for msgClass, msgTitle, and msgContent
	// then any existing values/content will be used

	var obj_msgDiv = null;
	if( obj_msgDiv = document.getElementById(divId) )
	{
		// The div exists so...
		if( msgClass.length > 0 )
		{
			// Set the message class
			obj_msgDiv.className = msgClass;
		}

		if( msgContent.length > 0 )
		{
			// Set the content if needed
			obj_msgDiv.innerHTML = msgContent;
		}

		// Display the message
		obj_msgDiv.style.display = "block";
	}
}


function esIsSelfServiceEnvironment()
{
	// Check the environment property to determine if we're in a self service or admin environment
	var isSelfServiceEnv = false;
	var env_type = document.getElementById("env_type").innerHTML;
	// var env_type = obj_env_type.value;
	if( env_type )
	{
	   var sIndex = env_type.indexOf("SS");
	   if( sIndex > -1 )
	   {
   		isSelfServiceEnv = true;
   	}
   }
	return isSelfServiceEnv;
}


function getLogInURL()
{
	// == Used by signin.html and passwordexpired.html
	// Returns a URL for log in that will preserve the current location and any querystring attributes
	// so that the user will be taken directly to the requested resource on successful authentication and authorisation

	// The setting for the login command
	var loginCommandAttributes = "cmd=login&languageCd=ENG";

	// Get the current URL
	var docURL = document.URL;
	var logInURL = "";

	// Check to see if there's a querystring already
	if ( docURL.indexOf("?") == -1 )
	{
		// There's no querystring, so we just need to add the login command attributes
		logInURL = docURL + "?" + loginCommandAttributes;
	}
	else
	{
		// There's a querystring with attributes that need preserving

		// Get the base URL (excluding the ?)
		var baseURL = docURL.substring(0, docURL.indexOf("?"));

		// Get the querystring (excluding the ?)
		var queryString = docURL.substring(docURL.indexOf("?") + 1, docURL.length);

		// Do some additional (and probably unnecessary) tidy up of the querystring
		// ... multiple &s to one
		queryString = queryString.replace(/&&+/g, "&");
		// ... remove a trailing &
		queryString = queryString.replace(/&$/g, "");
		// ... remove any additional ?s
		queryString = queryString.replace(/\?/g, "")

		// Remove any occurrences of commands (looking for cmd=* &cmd=*)
		queryString = queryString.replace(/&?cmd=[^&]*/g, "");

		// Remove any occurrences of commands (looking for errorCode=* &errorCode=*)
		queryString = queryString.replace(/&?errorCode=[^&]*/g, "");

		// Remove any occurrences of the languageCd attribute (looking for languageCd=* &languageCd=*)
		queryString = queryString.replace(/&?languageCd=[^&]*/g, "");

		// Check if we'll need an ampersand prefixing the loginCommandAttributes
		var separator = "&";
		// if there's nothing left in the querystring, then we won't need the ampersand
		if ( queryString.length == 0 )
		{
			separator = "";
		}
		// Put the complete URL back together with the updated querystring and with the login attributes at the end
		logInURL = baseURL + "?" + queryString + separator + loginCommandAttributes;
	}

	return logInURL;
}


function esRedirectToLogIn()
{
	// == Used in es-thickbox.js
	window.location.href = getLogInURL();
}


function esCloseWindow()
{
   var strLoc = document.URL;
   var ind1 = strLoc.indexOf("psp/");
   if ( ind1 == -1 )
   {
      ind1 = strLoc.indexOf("psc/");
   }
   if (ind1 > -1 )
   {
      ind1 = ind1 + 5;
      var ind2 = strLoc.indexOf("/",ind1);
      var strSubLoc = strLoc.substring(ind1,ind2);
      var ind3 = strSubLoc.indexOf("_");
      if (ind3 > -1)
      {
         var timeoutID = window.setTimeout("self.close()",1000);
      }
   }
}


function convertToMinutes( sessionTimeout )
{
   if (sessionTimeout<60)
   {
      document.write(" < 1 ");
   }
   else
   {
      document.write(Math.round(sessionTimeout / 60));
   }
}


function clearRecentSearch()
{
	try
	{
		if( typeof(window.sessionStorage) !== "undefined" )
		{
			sessionStorage.clear();
		}
	} catch(e)
	{}
}

