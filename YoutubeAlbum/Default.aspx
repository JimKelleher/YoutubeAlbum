<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="YoutubeAlbum.Default" %>

<!DOCTYPE html>

<!-- Responsive design: Portrait: -->
<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0">

<html xmlns="http://www.w3.org/1999/xhtml" >

<head>
    
    <%-- 1) Safari's "favicon" didn't show until I added the "type"
         2) Internet Explorer's "favicon" didn't show until I rebuilt a "proper" icon
            at this website: http://www.prodraw.net/favicon/generator.php - choose 48 X 48 --%>

    <title>YouTube Album Finder</title>

    <link rel="icon"       type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" type="text/css"     href="Site.css" />
    <link rel="stylesheet" type="text/css"     href="banner.css" />
    <link rel="stylesheet" type="text/css"     href="StandardStreams.css" />
    <link rel="stylesheet" type="text/css"     href="ArtistDataSourceSelection.css" />
    <link rel="stylesheet" type="text/css"     href="AngularMultiFilterSelect.css" />

    <link rel="stylesheet" type="text/css" href="JimsArtistDatabaseSelection.css" />

    <%-- External Processing --%>

    <script src="http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.js" type="text/javascript"></script>
    <script src="AngularMultiFilterSelect.js"                                       type="text/javascript"></script>
    <script src="ArtistDataSourceSelection.js"                                      type="text/javascript"></script>

    <script src="DiscographyOnlineArtistDataSource.js"  type="text/javascript"></script> 
    <script src="DemoTestArtistWikipediaNaming.js"     type="text/javascript"></script>
    <script src="MusicalArtist.js"                      type="text/javascript"></script>
    <script src="UnicodeASCII.js"                       type="text/javascript"></script>
    <script src="WikipediaDiscography.js"               type="text/javascript"></script>
    <script src="YoutubeAlbum.js"                       type="text/javascript"></script> 
    <script src="StandardStreams.js"                    type="text/javascript"></script>
    <script src="ArtistDataSourceSelection.js"          type="text/javascript"></script>
    <script src="DiscographyOnlineSelection.js"         type="text/javascript"></script>

    <script src="WorkingWebBrowserServices.js"          type="text/javascript"></script>

    <script src="hardcoded_main.js"                     type="text/javascript"></script>
    <script src="hardcoded_studio_albums.js"            type="text/javascript"></script>
    <script src="hardcoded_live_albums.js"              type="text/javascript"></script>
     
    <%-- Local Processing --%>
    <script type="text/javascript">

        //-----------------------------------------------------------------------------------------
        // Responsive web design is an approach that makes web pages render well on a variety of
        // devices and window or screen sizes.  Search for "responsive".
        window.addEventListener("orientationchange", function () {

            // The NOTE and processing below is taken from application ArtistMaint.  That app
            // had no problem when switching back to portrait mode.  This app does, though the
            // zooming is out, not in.  What a mess!  Here, the message will be generic and
            // apply to both portrait and landscape:
            alert("Correcting resizing error...");

            if (window.orientation == 0) {

                // Portrait:
                document.getElementById("viewport").setAttribute("content", "initial-scale=1.0");
            }
            else {
                // NOTE: It is a known problem that, on changing to landscape mode, the browser
                // fully zooms the page.  I have seen it documented for both Android and I-Phone.
                // Unfortunately, non of the solutions suggested worked for me.  In the course of
                // my debugging, I saw that a simple messagebox somehow short-circuits the problem.

                // Having wasted enough time on this, I will wait a few years, check back, and see
                // if the problem has been fixed.

                // Landscape:
                //alert("Correcting landscape resizing error...");
                document.getElementById("viewport").setAttribute("content", "initial-scale=0.5");
            }

        }, false);
        //---------------------------------------------------------------------------------------------------

        // These will be filled in main():
        var standard_streams_services;
        var youtube_album_startup_services;

        // This will be filled in get_artists_albums_process():
        var youtube_album_services;

        // <HEAD> AVAILABLE FUNCTIONS:

        function main() {

            //---------------------------------------------------------------------
            // Responsive design:
            if (window.innerWidth < 700) {
                document.getElementById("bannerDivFull").style.display = "none";
            }
            else {
                document.getElementById("bannerDivPhone").style.display = "none";
            }
            //---------------------------------------------------------------------

            // NOTE: If we have gotten this far, it means that JavaScript is enabled.  Hide this:
            document.getElementById("javascript_message").style.display = "none";

            // NOTE: All output of all types will be handled by this service:
            standard_streams_services = new standard_streams();

            // Init, assemble and create the GUI components of the Angular Multi Filter Select service:
            init_angular_multi_filter_select();

            // NOTE: The complicated module-invocation process across four applications, WD,
            // YA, WD Node and YA Node is described in document:
            // C:\a_dev\ASP\YoutubeAlbum\documents\WD & YA high-level calls.txt

            // Initialize Youtube album startup services:
            youtube_album_startup_services = new youtube_album_startup();

            // Set default radiobutton selections:
            set_discography_online_default();
            set_artist_datasource_default();
            set_album_type_defaults();
            set_output_format_default();

            // Initialize.  Enable/disable radiobuttons and set other values that are dependent on 
            // other radiobuttons:
            cross_object_synchronize();

            // Instantiate the standard datasource objects:
            initialize_standard_datasource(

                // NOTE: The datasource's on-screen link's text will be the definitive
                // name of the datasource:
                document.getElementById("artist_datasource_demo_test_url").text
            );

            // Set this style (dynamically) of one of the "standard streams" uniquely for this
            // application.   We do this because it is a general-purpose, resusable (copymember)
            // field which doesn't, and shouldn't, have a single style.

            // Style as "newspaper" columns:
            document.getElementById(standard_streams_services.OUTPUT_FIELD).className = "newspaper";

            // Initialize:
            clear_form();

        }

        function ButtonAbout_onclick() {

            open_popup_window(
                "About.aspx",
	            true, // modal dialog
	            "no", // resizable
	            "no", // scrollbars
                505,  // width
                840   // height
            );

        }

        function clear_form() {

            document.getElementById("output_json").value = "";
            document.getElementById("output_json").style.visibility = "hidden";

            // Reset:
            standard_streams_services.clear("error");
            standard_streams_services.clear("message");
            standard_streams_services.clear("output");

        }

        function get_artists_albums() {

            // Reset for multiple, sequential runs:
            clear_form();

            // Set the "is running" message:
            standard_streams_services.write("message", "Please wait while we retrieve discography information...");

            // Do the work:

            // Disable because the process is now busy:
            document.getElementById("run"        ).disabled = true;
            document.getElementById("ButtonAbout").disabled = true;

            // NOTE: This timer-based call serves only to allow the message, above, to be seen.
            // The following milliseconds were arrived at by trial and error.  If the wait time
            // is too short, the message never shows:
            setTimeout(function () { get_artists_albums_process(); }, 100); // 100 = 100 milliseconds

        }
        
        function get_artists_albums_process() {

            //------------------------------------------------------------------------------------
            // Selection Criteria, 1 of 4:
            var datasource_object = get_artist_datasource_selection();

            // Selection Criteria, 2 of 4:
            var discography_online = get_discography_online_selection();

            // Selection Criteria, 3 of 4:
            var album_type_selections = get_album_type_selections();

            // Selection Criteria, 4 of 4:
            var output_format = get_output_format_selection();

            //-------------------------------------------------------------------------------------------------------
            // Instantiate YouTube Album services:
            youtube_album_services = new youtube_album(
                discography_online,
                datasource_object.offline_discographies,

                // These are only defined and passed in the Node.js implementation, in file index.js:
                null, // write_output
                null  // node_js_response
            );

            // NOTE: This may eventually produce either JSON or HTML:
            youtube_album_startup_services.get_albums_core(

                output_format,
                datasource_object.artist_array,

                album_type_selections.studio,
                album_type_selections.concert,
                album_type_selections.greatest_hits,

            );

            //-------------------------------------------------------------------------------------------------------
            // Clear the "is running" message.

            // NOTE: This does not need to be paired with a timer-based call because, as the last
            // statement in the job stream, it will be visible to the user:
            standard_streams_services.clear("message");

            //------------------------------------------------------------------------------------
        }

    </script>

</head>

<body>  
 
    <!-- JavaScript-disabled processing.  Show this by default.  To test this processing, simply toggle the
         Enable JavaScript setting of your browser and refresh the view of the page. -->
    <div id="javascript_message">
        You need JavaScript enabled to view this web page properly.<br/><br/>
    </div>

    <!--------------------------- Responsive design: --------------------------->
    <!-- For Full Size Monitors: -->
    <div id="bannerDivFull" class="bannerDiv">
        <img src="youtube.png" alt="YouTube Logo" />
        <span id="bannerTextFull" class="bannerText">Album Finder</span>
    </div>
    
    <!-- For Cell Phones: -->
    <div id="bannerDivPhone" class="bannerDiv">
        <img src="youtube.png" alt="YouTube Logo" />
        <br/>
        <span id="bannerTextPhone" class="bannerText">Album Finder</span>
    </div>
    <!-------------------------------------------------------------------------->
                  
    <br/>
    <br/>

    <form name="youtube_album" action="">  

         <table>
	        <tr>
                <%-- row 1, column 1 --%>
		        <td class="SelectionTD">
                    <%------------------------------------------------------------------------------------------------------------------%> 
                    <!-- This shows radio buttons that enable the user to make his desired Discography Online input selection. -->
                    <!--#include file="DiscographyOnlineSelection.htm"-->
                    <%------------------------------------------------------------------------------------------------------------------%>
                </td>

                <%-- row 1, column 2 --%>
		        <td class="SelectionTD">
                    <%------------------------------------------------------------------------------------------------------------------%> 
                    <!--#include file="AlbumTypeSelection.htm"-->
                    <%------------------------------------------------------------------------------------------------------------------%>
                </td>
	        </tr>
	        <tr>
                <%-- row 1, column 1 --%>
		        <td class="SelectionTD">
                    <%------------------------------------------------------------------------------------------------------------------%> 
                        <!-- NOTE: This is a partial HTML file that can be INCLUDEd into a full HTML file. It shows radio buttons that 
                    enable the user to make his/her desired Artist Data Source input selection. Currently, only JimRadio is enabled. -->

                    <!--#include file="ArtistDataSourceSelection.htm"-->
                    <%------------------------------------------------------------------------------------------------------------------%>
                </td>

                <%-- row 1, column 2 --%>
		        <td class="SelectionTD">
                    <%------------------------------------------------------------------------------------------------------------------%> 
                    <!--#include file="OutputFormatSelection.htm"-->
                    <%------------------------------------------------------------------------------------------------------------------%>
                </td>
	        </tr>
        </table>
        <br/>

        <input id="run" type="button" onclick="get_artists_albums()" value="Get Artists' Albums"/>&nbsp;
        <input id="ButtonAbout" type="button" value="About" onclick="return ButtonAbout_onclick()"/>
        <br/>
        <br/>
       
        <input id="cancel" type="button" onclick="youtube_album_services.cancel_query()" value="Cancel" disabled="disabled"/>&nbsp;
        <br/>
        <br/>
        
        <%------------------------------------------------------------------------------------------------------------------%> 
        <!-- This shows the "standard footer" for my GUI forms. -->
        <!--#include file="StandardStreams.htm"-->
        <%------------------------------------------------------------------------------------------------------------------%>

        <textarea id="output_json" readonly="readonly" rows="1" cols="1"></textarea>

    </form>

    <script type="text/javascript">

        //-----------------------------------------------------------------------------
        // <BODY> STARTUP PROCESSING:
        main();
        //-----------------------------------------------------------------------------

    </script>

</body>

</html>
