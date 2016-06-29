// ===========================================================================
// Page global for log in submission check
// ===========================================================================
var esLoginAlreadySubmitted = false;
// ===========================================================================


function signin()
 {
	// =======================================================================
	// Called from signin.html
	// =======================================================================

	// Check to see if we're already processing a login to prevent
	// additional submissions due to slow login processing
	if( !esLoginAlreadySubmitted )
	{
		// This is the first submission so prevent another...
		// set the submit check flag
		esLoginAlreadySubmitted = true;

		// disable the login button
		var loginButton = document.getElementById('login_button');
		loginButton.disabled = true;

		// do some pre-processing...
		// ===================================================================

		// Get a reference to the form
		var form = document.getElementById('login_form');

		// PS - Set the timezoneoffset
	    var now = new Date();
		var obj_timezoneOffset = document.getElementById('timezoneOffset');
	    obj_timezoneOffset.value = now.getTimezoneOffset();

		// ANU - set the form action the login URL, see getLogInURL() for details.
		form.action = getLogInURL();

		// Do some ANU specific manipulations
		// Set the userid prefix for this environment and force uppercase
		var obj_form_userid = document.getElementById('form_userid');
		var obj_userid = document.getElementById('userid');
		var obj_prefix = document.getElementById('prefix');
		obj_userid.value = obj_prefix.value + obj_form_userid.value.toUpperCase();

		// Set the anupwd field
		// #### form.anupwd.value = form.pwd.value;
		var obj_pwd = document.getElementById('pwd');
		var obj_anupwd = document.getElementById('anupwd');
		obj_anupwd.value = obj_pwd.value;

		// ===================================================================
		// ...and submit the login
		return true;
	}
	else
	{
		// The login request has already been submitted...
		alert('The login request is processing...');
		// ...so don't submit another
		return false;
	}
}


function setFocus()
 {
    try
	{
        document.getElementById('form_userid').focus()
    }
    catch(e) {}
    return;
}


function setErrorMessages()
 {
    var login_error = document.getElementById('login_error').innerHTML;
    var discovery_error = document.getElementById('discovery_error').innerHTML;
    var browsercheck_error = document.getElementById('browsercheck_error').innerHTML;
    if ( login_error.length != 0 || discovery_error.length != 0 || browsercheck_error.length != 0 )
    {
        document.getElementById('error_img').style.display = 'block';
        if (login_error.length != 0)
		{
            document.getElementById('login_error').style.visibility = 'visible';
        }
        if (discovery_error.length != 0)
		{
            document.getElementById('discovery_error').style.visibility = 'visible';
        }
        if (browsercheck_error.length != 0)
		{
            document.getElementById('browsercheck_error').style.visibility = 'visible';
        }
    }
    else
    {
        setFocus();
    }
}


function esSetMenu()
{
	var obj_change_password_link = null;
	if( obj_change_password_link = document.getElementById("es_change_password_link") )
	{
		obj_change_password_link.href = esGetChangePasswordURL();
	}
	var env_source = document.getElementById("env_source").innerHTML;
	// var env_source = obj_env_source.value;

	var selfServiceMenuId = "nav-ss-" + env_source; // nav-2 is the self service menu
	var adminMenuId       = "nav-admin-" + env_source; // nav-3 is the admin menu

	var menuId = selfServiceMenuId; // Set the self service menu by default

	if( !esIsSelfServiceEnvironment() )
	{
		menuId = adminMenuId; // Set the admin menu
	}

	var obj_menuToShow = null;
	if( obj_menuToShow = document.getElementById(menuId) )
	{
		obj_menuToShow.style.display = "block";
	}
}




