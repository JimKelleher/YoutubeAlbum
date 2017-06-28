<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="YoutubeAlbum.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" >

<head>
    
    <%-- 1) Safari's "favicon" didn't show until I added the "type"
         2) Internet Explorer's "favicon" didn't show until I rebuilt a "proper" icon
            at this website: http://www.prodraw.net/favicon/generator.php - choose 48 X 48 --%>

    <title>YouTube Album Finder</title>

    <link rel="icon"       type="image/x-icon" href="favicon.ico" />
    <link rel="stylesheet" type="text/css"     href="Site.css" />
    <link rel="stylesheet" type="text/css"     href="StandardStreams.css" />
    <link rel="stylesheet" type="text/css"     href="ArtistDataSourceSelection.css" />

    <%-- External Processing --%>

    <script src="DiscographyOnlineArtistDataSource.js"  type="text/javascript"></script> 
    <script src="JimRadioArtistWikipediaNaming1.js"     type="text/javascript"></script>
    <script src="JimRadioArtistWikipediaNaming2.js"     type="text/javascript"></script>
    <script src="MusicalArtist.js"                      type="text/javascript"></script>
    <script src="UnicodeASCII.js"                       type="text/javascript"></script>
    <script src="WikipediaDiscography.js"               type="text/javascript"></script>
    <script src="YoutubeAlbum.js"                       type="text/javascript"></script> 
    <script src="StandardStreams.js"                    type="text/javascript"></script>
    <script src="ArtistDataSourceSelection.js"          type="text/javascript"></script>
    <script src="DiscographyOnlineSelection.js"         type="text/javascript"></script>

    <script src="WorkingWebBrowserServices.js"          type="text/javascript"></script>
     
    <%-- Local Processing --%>
    <script type="text/javascript">

        // This will be filled in main():
        var standard_streams_services;

        // <HEAD> AVAILABLE FUNCTIONS:

        function main() {

            // NOTE: If we have gotten this far, it means that JavaScript is enabled.  Hide this:
            document.getElementById("javascript_message").style.display = "none";

            // NOTE: All output of all types will be handeled by this service:
            standard_streams_services = new standard_streams();

            // Set default radiobutton selections:
            set_discography_online_default();
            set_artist_datasource_default();
            set_album_type_defaults();

            // Initialize.  Enable/disable radiobuttons and set other values that are dependent on 
            // other radiobuttons:
            cross_object_synchronize();

            // Instantiate the standard datasource objects:
            initialize_standard_datasources(

                // NOTE: The datasource's on-screen link's text will be the definitive name of the datasource:
                document.getElementById("artist_datasource_jimradio_url").text,
                document.getElementById("artist_datasource_youtube_url" ).text

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
	            640   // height
            );

        }

        function clear_form() {

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
            // Selection Criteria, 1 of 3:
            var datasource_object = get_artist_datasource_selection();

            // Selection Criteria, 2 of 3:
            var discography_online = get_discography_online_selection();

            // Selection Criteria, 3 of 3:
            var album_type_selections = get_album_type_selections();

            //------------------------------------------------------------------------------------
            // Instantiate YouTube Album services:
            youtube_album_services = new youtube_album(
                discography_online,
                datasource_object.offline_discographies
            );

            // Use YouTube Album services to get a human-readable report:
            youtube_album_services.get_HTML_report(

                datasource_object.artist_array,

                album_type_selections.studio,
                album_type_selections.concert,
                album_type_selections.greatest_hits

            );

            //------------------------------------------------------------------------------------
            // Clear the "is running" message.

            // NOTE: This does not need to be paired with a timer-based call because, as the last
            // statement in the job stream, it will be visible to the user:
            standard_streams_services.clear("message");

            //------------------------------------------------------------------------------------
        }

    </script>

</head>

<body>  
 
    <div class="BannerDiv" >

   <%-- NOTE 1 of 2: Use of a line break, a table and text top padding is much easier
        than trying to align these via CSS only: --%>

        <br/>
        <table>
            <tr>
                <td class="BannerTD"><img src="youtube.png" alt="YouTube Logo" /></td>
                <td class="BannerTD BannerText">Album Finder</td>
            </tr>
        </table> 
                  
    </div>

    <!-- JavaScript-disabled processing.  Show this by default.  To test this processing, simply toggle the
         Enable JavaScript setting of your browser and refresh the view of the page. -->
    <div id="javascript_message">
        You need JavaScript enabled to view this web page properly.<br/><br/>
    </div>

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
		        <td>
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
                    <!--#include file="AlbumTypeSelection.htm"-->
                    <%------------------------------------------------------------------------------------------------------------------%>
                </td>
	        </tr>
        </table>
        <br/>

        <button id="run" type="button" onclick="get_artists_albums()">Get Artists' Albums</button>&nbsp;
        <input id="ButtonAbout" type="button" value="About" onclick="return ButtonAbout_onclick()"/>
        <br/>
        <br/>
       
        <button id="cancel" type="button" onclick="youtube_album_services.cancel_query()" disabled="disabled">Cancel</button>
        <br/>
        <br/>
        
        <%------------------------------------------------------------------------------------------------------------------%> 
        <!-- This shows the "standard footer" for my GUI forms. -->
        <!--#include file="StandardStreams.htm"-->
        <%------------------------------------------------------------------------------------------------------------------%>

    </form>

    <script type="text/javascript">

        //-----------------------------------------------------------------------------
        // <BODY> STARTUP PROCESSING:
        main();
        //-----------------------------------------------------------------------------

    </script>

</body>

</html>
