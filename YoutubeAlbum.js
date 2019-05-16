// NOTE: This is a dummy object to get around TypeScript compile errors.  The real object
// is defined and initialized in Default.aspx:
var youtube_album_services;
// Debugging/Strict Mode 1 of 3 - Prerequisite 1:
// NOTE: Usage of the "use strict" directive will cause get_function_description_level_2()'s
// use of "arguments.callee.caller.caller" to fail.  Since this is a fundamental aspect of
// Discography Debugging, strict mode must be turned off for it to work.
"use strict";
// This file contains Youtube Album lookup services along with Youtube Album Start-Up
// services which assist in their instantiation.  It is used in both ASP (browser) and
// Node.js(server) implementations.
// Dependency: json2.js is needed to use JSON.parse()
// NOTE: The following high level functions are shown in hierarchical, usage order:
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// My homemade Youtube Album Start-Up object Part A, the class definition/constructor.
// Its purpose is to assist in the instantiation of the Youtube Album object, below,
// by way of arguments passed through the URL.
// NOTE: The ASP usage of the Youtube Album object does not take URL arguments. The
// Node.js usage does.  As such, it relies on Node.js-specific processing.
// NOTE: Search for the following for Node.js-installed version of this process:
// "Node.js process 1 of 2"
// "Node.js process 2 of 2"
var DISCOGRAPHY_FORMAT = "JSON";
// My homemade Youtube Album Start-Up object Part A, the class definition/constructor:
var youtube_album_startup = /** @class */ (function () {
    function youtube_album_startup() {
    }
    // My homemade Youtube Album Start-Up object Part B, utility functions:
    // EXTERNAL INTERFACE 1 of 2:
    youtube_album_startup.prototype.youtube_album_argument = function (url_search) {
        // NOTE: I code for the following scenarios only (not all possible ones):
        //------------------------------------------------------------------------------------------
        // Test scenario 1: An offline discography, all album types:
        //
        // ?offline=JimRadioArtistWikipediaNaming1.json&studio=y&concert=y&greatest_hits=y
        //------------------------------------------------------------------------------------------
        // Test scenario 2: An online discography, studio albums only:
        //
        // NOTE: An online discography is implied by the presence of artist argument(s).
        //
        // NOTE 2: Since I'm using the URL argument to pass artists, only a limited number
        // of artists may be passed.
        //
        // ?artist=Bruce+Springsteen&artist=Electric+Light+Orchestra&artist=Elton+John&studio=y
        //------------------------------------------------------------------------------------------
        // Initialize Wikipedia discography startup services:
        var wikipedia_discography_startup_services = new wikipedia_discography_startup();
        // NOTE: This object will retain information about the URL arguments as passed
        // for subsequent reference:
        wikipedia_discography_startup_services.wikipedia_discography_argument(url_search);
        //--------------------------------------------------------------------------------------------------------
        // Argument group 1 of 3: Look for the Artist(s) argument(s):
        this.online = wikipedia_discography_startup_services.online;
        // Online discographies come live from the Wikipedia website:
        if (this.online == true) {
            this.artist_array = wikipedia_discography_startup_services.artist_array;
            //--------------------------------------------------------------------------------------------------------
            // Single argument 2 of 3: Look for the Offline argument:
            // Offline discographies are static and come from JSON stored in a file:
        }
        else {
            this.offline_discographies_json = wikipedia_discography_startup_services.offline_discographies_json;
        }
        //--------------------------------------------------------------------------------------------------------
        // Argument group 3 of 3: Album Types:
        this.studio_selected = true;
        this.concert_selected = true;
        this.greatest_hits_selected = true;
        //--------------------------------------------------------------------------------------------------------
    };
    // EXTERNAL INTERFACE 2 of 2:
    youtube_album_startup.prototype.get_albums_core = function (output_format, selected_artist_array, studio_selected, concert_selected, greatest_hits_selected) {
        // Save the runtime parameters:
        youtube_album_services.studio_selected = studio_selected;
        youtube_album_services.concert_selected = concert_selected;
        youtube_album_services.greatest_hits_selected = greatest_hits_selected;
        youtube_album_services.output_format = output_format;
        // Initialize the Wikipedia/YouTube Musical Artist services object:
        youtube_album_services.runtime_musical_artist_services = new musical_artist();
        // Initialize the Wikipedia Discography services object:
        youtube_album_services.runtime_wikipedia_discography_services = new wikipedia_discography(youtube_album_services.online, youtube_album_services.offline_discographies);
        // Use Wikipedia Discography services to get the discographies of all artists in the
        // selected artist array in the form of a JSON string:
        youtube_album_services.runtime_all_artists_discog_JSON_string =
            youtube_album_services.runtime_wikipedia_discography_services.get_discographies_JSON_string(selected_artist_array, DISCOGRAPHY_FORMAT);
        // If a proper discography was not found...
        if (youtube_album_services.runtime_wikipedia_discography_services.error_code < 0) {
            //...prepare to inform the user...
            youtube_album_services.error_code = youtube_album_services.runtime_wikipedia_discography_services.error_code;
            youtube_album_services.error_message = youtube_album_services.runtime_wikipedia_discography_services.error_message;
        }
        else {
            //...otherwise, continue the processing normally:
            // Initialize the "runtime loop" variables:
            youtube_album_services.runtime_loop_artist_array = selected_artist_array;
            youtube_album_services.runtime_loop_artist_array_index = -1;
            // Do the work:
            // NOTE: This timer-based call serves only to allow the message, above, to be seen:
            setTimeout(function () { youtube_album_services.level_1_get_albums_artist(); }.bind(this), 100); // 100 millisecond
        }
    };
    return youtube_album_startup;
}());
//----------------------------------------------------------------------------------------------------
// Constants:    
// NOTE: Normally I would extract such constants as these to web.config.  However, since such
// efforts fall in the category of "administrative programming", in the interest of saving
// time I will not do so:
var YOUTUBE_GDATA_QUERY_SEARCH_PREFIX = "https://www.googleapis.com/youtube/v3/search";
var YOUTUBE_GDATA_QUERY_VIDEOS_PREFIX = "https://www.googleapis.com/youtube/v3/videos";
// NOTE: This affects the query greatly:            
var YOUTUBE_GDATA_QUERY_QUALIFIER = "+full+album";
//------------------------------------------------------------------------------------
var YOUTUBE_GDATA_DEVELOPER_KEY = "API_KEY";
//------------------------------------------------------------------------------------
// NOTE: This tests the "error_code = -3" condition:
//const YOUTUBE_GDATA_DEVELOPER_KEY: string = "xxx";
//------------------------------------------------------------------------------------
var YOUTUBE_VIDEO_PREFIX = "http://www.youtube.com/watch?v=";
var YOUTUBE_IMAGE_PREFIX = "https://i.ytimg.com/vi/";
var YOUTUBE_ITEMS_PER_PAGE = 50;
//----------------------------------------------------------------------------------------------------
// Classes:
// This is filled by level_3_maybe_write_video_page():
var ArtistVideos = /** @class */ (function () {
    function ArtistVideos() {
    }
    return ArtistVideos;
}());
// This is filled by step_C_get_youtube_duration_page():
var Video = /** @class */ (function () {
    function Video() {
    }
    return Video;
}());
//-----------------------------------------------------------------------------
// These were created with the help of the online utility http://json2ts.com/
// This was filled by get_youtube_response_JSON_object():
var YoutubeVideoListResponse = /** @class */ (function () {
    function YoutubeVideoListResponse() {
    }
    return YoutubeVideoListResponse;
}());
// These are sub-classes:
var PageInfo = /** @class */ (function () {
    function PageInfo() {
    }
    return PageInfo;
}());
var RegionRestriction = /** @class */ (function () {
    function RegionRestriction() {
    }
    return RegionRestriction;
}());
var ContentDetails = /** @class */ (function () {
    function ContentDetails() {
    }
    return ContentDetails;
}());
var Item = /** @class */ (function () {
    function Item() {
    }
    return Item;
}());
var Id = /** @class */ (function () {
    function Id() {
    }
    return Id;
}());
var Default = /** @class */ (function () {
    function Default() {
    }
    return Default;
}());
var Medium = /** @class */ (function () {
    function Medium() {
    }
    return Medium;
}());
var High = /** @class */ (function () {
    function High() {
    }
    return High;
}());
var Thumbnails = /** @class */ (function () {
    function Thumbnails() {
    }
    return Thumbnails;
}());
var Snippet = /** @class */ (function () {
    function Snippet() {
    }
    return Snippet;
}());
var ExpressResponse = /** @class */ (function () {
    function ExpressResponse() {
    }
    return ExpressResponse;
}());
// My homemade Youtube Album object Part A, the class definition/constructor:
var youtube_album = /** @class */ (function () {
    //------------------------------------------------------------------------------------------------
    function youtube_album(online, offline_discographies, write_output, node_js_response) {
        // Save the arguments:
        //---------------------------------------------------------------------------------
        // CROSS-REFERENCE A - The Four Seasons - A work-around made permanent
        // Wikipedia artist:    The Allman Brothers Band
        // Artist:              The Allman Brothers Band
        // Artist cored:            Allman Brothers
        // Artist match key:        allman brothers
        // Wikipedia artist:    The Four Seasons (band)
        // Artist:              The Four Seasons
        // Artist cored:            Four Seasons
        // Artist match key:        four seasons
        this.wikipedia_artist = "";
        this.artist = "";
        this.artist_cored = "";
        this.artist_match_key = "";
        //---------------------------------------------------------------------------------
        // Declare/init:
        this.albums_HTML_string = "";
        this.albums_JSON_string = "";
        this.artistVideosArray = [];
        this.artist_count = 0;
        this.album_count = 0;
        this.match_attempts = 0;
        this.matches = 0;
        // Runtime parameters and related.
        this.studio_selected = false;
        this.concert_selected = false;
        this.greatest_hits_selected = false;
        this.output_format = null;
        //---------------------------------------------------------------------------------
        this.studio_album_array_optimized = null;
        this.concert_album_array_optimized = null;
        this.runtime_loop_artist_array = null;
        this.runtime_loop_artist_array_index = null;
        this.runtime_all_artists_discog_JSON_string = null;
        this.runtime_wikipedia_discography_services = null;
        this.runtime_musical_artist_services = null;
        // These are the error handling fields.  Init them.
        this.error_code = 0;
        this.error_message = "";
        //---------------------------------------------------------------------------------
        this.debug_trace_process = false;
        this.debug_trace_matching = false;
        this.debug_trace_eponymous = false;
        //---------------------------------------------------------------------------------
        this.video_artist_requires_quotes = null;
        //------------------------------------------------------------------------------------------------
        // NOTE: These permanent development tools are built-in:
        // It only makes sense to set one of these to TRUE at a time since subsequent processing
        // will not take place.
        this.force_error_youtube_videos_first = false;
        this.force_error_youtube_videos_subsequent = false;
        this.force_error_youtube_duration = false;
        //------------------------------------------------------------------------------------------------
        this.discog_contains_eponymous_album = false;
        this.video_flagged_as_eponymous_album = false;
        this.level_4_remove_special_chars = function (string_to_clean) {
            // Since we will be modifying the argument, let's make a copy and work with that:
            var string_to_clean_edited = string_to_clean;
            // NOTE: If we don't remove these now, they will cause the Database application's
            // query engine (JSON Path) to choke later:
            // -------------------------------------------------------------------------------------
            // WINNOWING:
            // Edit down (omitting exceptions) to metacharacters:
            // \s = whitespace
            // \w = word character. From a-z, A-Z, 0-9, including the _ (underscore) character.
            string_to_clean_edited = strip_string_to_regexp(string_to_clean_edited, "[\\w\\s]");
            // -------------------------------------------------------------------------------------
            // TIDYING:
            // In the above edits, I am careless about extra spaces because I'm cleaning them hereif (this.debug_trace_:
            string_to_clean_edited = consolidate_extraneous_spaces(string_to_clean_edited);
            // -------------------------------------------------------------------------------------
            // Return the modified version of the string:
            return string_to_clean_edited;
        };
        this.level_4_write_video_core_inclusion_test = function (artist_match_key, http_get_result) {
            // NOTE: This is the "core inclusion test" because, if the data gets through the "sieve" of nesting that follows, it will be "written"
            // (ie, appended to the report string we are building).
            // NOTE 2: This editing sequence guarantees both efficiency and correctness and should not be altered without serious consideration.  Eponymous
            // albums have the potential to generate false-positive matches if you are not careful.
            if (this.debug_trace_process == true) {
                get_function_description("level_4_write_video_core_inclusion_test");
            }
            var duration_ISO_format_string, duration_seconds;
            var match_index, album_type;
            var url_to_get, request_response_text, request_response_JSON_object;
            var should_accept_album, should_write_album;
            var video_match_key, video;
            var items_per_page = http_get_result.items.length;
            if (this.debug_trace_matching == true) {
                for (var i = 0; i < items_per_page; i++) {
                    // Init a new video object:
                    var video_object = {
                        videoId: http_get_result.items[i].id.videoId,
                        // Handle Character encodings in HTML:
                        title: decodeHtmlEntity(http_get_result.items[i].snippet.title),
                        description: http_get_result.items[i].snippet.description,
                        image: http_get_result.items[i].snippet.thumbnails.default.url,
                        seconds: 0
                    };
                    this.write_debug("TITLE: " + video_object.title);
                }
            }
            for (var i = 0; i < items_per_page; i++) {
                should_accept_album = false; // init
                //-------------------------------------------------------------------------------------
                // Character encodings in HTML:
                // https://en.wikipedia.org/wiki/Character_encodings_in_HTML#HTML_character_references
                // The O&#39;Jays
                var title = http_get_result.items[i].snippet.title;
                // The O'Jays
                title = decodeHtmlEntity(title);
                //-------------------------------------------------------------------------------------
                video_match_key = this.runtime_musical_artist_services.get_title_match_key(title);
                if (this.debug_trace_matching == true) {
                    this.write_debug("ARTIST_MATCH_KEY: " + artist_match_key);
                    this.write_debug("VIDEO_MATCH_KEY, 1: " + video_match_key);
                }
                video_match_key = this.alter_video_to_include_or_exclude(video_match_key, artist_match_key);
                if (this.debug_trace_matching == true) {
                    this.write_debug("VIDEO_MATCH_KEY, 2: " + video_match_key);
                }
                if (this.level_4_write_video_core_inclusion_test_level_A_artist(video_match_key, artist_match_key) == true) {
                    if (this.level_4_write_video_core_inclusion_test_level_B_video(video_match_key, artist_match_key) == true) {
                        // Init a new video object...
                        var video_object = {
                            videoId: http_get_result.items[i].id.videoId,
                            // Handle Character encodings in HTML:
                            title: title,
                            description: http_get_result.items[i].snippet.description,
                            image: http_get_result.items[i].snippet.thumbnails.default.url,
                            seconds: 0
                        };
                        // NOTE: If we don't remove these now, they will cause the Database application's
                        // query engine (JSON Path) to choke later:
                        video_object.title = this.level_4_remove_special_chars(video_object.title);
                        video_object.description = this.level_4_remove_special_chars(video_object.description);
                        if (this.video_flagged_as_eponymous_album == true) {
                            if (this.debug_trace_eponymous == true) {
                                video_object.title = "EPONYMOUS: " + video_object.title;
                            }
                            this.video_flagged_as_eponymous_album = false; // reset
                        }
                        //... and load it to the final output object array:
                        this.video_array_all.push(video_object);
                    }
                }
            }
        };
        this.level_4_write_video_core_inclusion_test_level_A_artist = function (video_match_key, artist_match_key) {
            if (this.debug_trace_process == true) {
                get_function_description("level_4_write_video_core_inclusion_test_level_A_artist");
            }
            var return_value = false; // init
            // NOTE: The data must get through this sieve of nesting in order to be included as belonging to the artist:
            if (this.intelligent_match_found(video_match_key, artist_match_key) == true) {
                if (this.is_video_invalid_all_artists(artist_match_key, video_match_key) == false) {
                    if (this.is_video_invalid_by_artist(artist_match_key, video_match_key) == false) {
                        // NOTE: We don't want to inadvertantly "edit" the content of the artist's name, eg: The Asteroids Galaxy Tour ("tour"),
                        // The Specials ("special"), The Style Council ("style"):                            
                        if (this.is_video_artist_a_place_name(artist_match_key, video_match_key) == false) {
                            return_value = true;
                        }
                    }
                }
            }
            return return_value;
        };
        this.level_4_write_video_core_inclusion_test_level_B_video = function (video_match_key, artist_match_key) {
            if (this.debug_trace_process == true) {
                get_function_description("level_4_write_video_core_inclusion_test_level_B_video");
            }
            // NOTE: The data must get through this sieve of nesting in order to be included.
            // NOTE 2: When selecting Concert albums, I could have determined Concert albums by looking only at the video title as was
            // done for Greatest Hits, below.  However, I want to implement strict quality control on Concerts as there is a lot of
            // junk in YouTube - more junk than good stuff. Instead, I do the check against the discography only, so as to only get
            // "real" Concert albums and then do my matching against those.
            // NOTE 3: The prevalence of bad Concert albums is so great that they sometimes "leak" in where they are not wanted. Some
            // reference concert tours that "support" (and mention) a particular album and some artists release Greatest Hits that
            // are named after (and mention) prior albums.  In both cases, false positives would be generated.  Thus, I will look at
            // the video title to determine Concerts, but only to filter them out where they are not wanted.
            // NOTE 4: Filtering OUT will be done using a quick, superficial check against the video title.
            //         Filtering IN  will be done using a long running, in-depth check against the artist's discography.
            var video_is_greatest_hits = this.is_video_a_greatest_hits(video_match_key);
            var video_is_concert = this.runtime_wikipedia_discography_services.is_concert(video_match_key);
            //----------------------------------------------------------------------------------------------------------------------------------------------
            var should_accept_album = false; // init
            //----------------------------------------------------------------------------------------------------------------------------------------------
            // EFFICIENCY NOTE: Greatest hits can be determined just by looking at the YouTube video title thus, for efficiency, we do it first:
            if (this.greatest_hits_selected == true &&
                video_is_concert == false) {
                // NOTE: Since we are not using intelligent matching here, we must update the match counts here:
                this.match_attempts++;
                if (this.is_video_a_greatest_hits(video_match_key) == true) {
                    should_accept_album = true;
                    this.matches++;
                }
            }
            // EFFICIENCY NOTE 2: All subsequent matching requires a video-to-discography lookup, a time consuming process, so we will make sure that
            // these matches are desired, based on the "concert_selected"/"studio_selected" switches, before starting these processes up.
            //----------------------------------------------------------------------------------------------------------------------------------------------
            // If the Youtube video title contains one of the concert album titles:
            if (should_accept_album == false) {
                // Only accept "valid" concert albums:
                if (this.concert_selected == true &&
                    video_is_greatest_hits == false) {
                    if (this.level_5_video_title_contains_album_title(video_match_key, artist_match_key, this.concert_album_array_optimized) != "") {
                        should_accept_album = true;
                    }
                }
            }
            //----------------------------------------------------------------------------------------------------------------------------------------------
            // If the Youtube video title contains one of the studio album titles:
            if (should_accept_album == false) {
                if (this.studio_selected == true) {
                    if (video_is_greatest_hits == false &&
                        video_is_concert == false) {
                        if (this.level_5_video_title_contains_album_title(video_match_key, artist_match_key, this.studio_album_array_optimized) != "") {
                            should_accept_album = true;
                        }
                        // NOTE: If the above processing isn't functioning perfectly, this bucket acts as a "spill way" and a lot of non-eponymous stuff ends up
                        // here.  False positive matches often have the effect of looking like eponymous albums.  Only when the code above is tuned perfectly can
                        // the code below work correctly.
                        // NOTE 2: A good debug technique is to A) turn on "debug_trace_eponymous" and B) run the app and look for invalid eponymous designations.
                        this.video_flagged_as_eponymous_album = false; // init
                        if (should_accept_album == false) {
                            if (this.discog_contains_eponymous_album == true) {
                                if (this.is_video_of_eponymous_album(video_match_key, artist_match_key)) {
                                    should_accept_album = true;
                                    this.video_flagged_as_eponymous_album = true;
                                }
                            }
                        }
                    }
                }
            }
            return should_accept_album;
        };
        this.is_video_of_eponymous_album = function (video_match_key, artist_match_key) {
            // The video has the appearance of being an eponymous album (this is a very inexact science):
            // NOTE 1:  The majority of eponymous albums take this form: "The Cars - The Cars (Full Album)" or
            // some variation: "Pretenders Pretenders Debut Full album".
            // NOTE 2: This process is somewhat desperate in that it unavoidably generates false positives because
            // the methodology (counting occurrences of the artists name) is so crude.  However, it is preferable
            // to be too lenient on matching because it's better to have a few bad videos that we can ignore rather
            // than missing an eponymous album we could have had.  
            var return_value = false; // init
            var artist_count = count_occurrences(video_match_key, artist_match_key);
            // The "standard" format:
            if (artist_count == 2) {
                return_value = true;
                // The exceptional formats:
            }
            else if (artist_count == 1) {
                // This edit is crucial to avoid a lot of false positive matches:
                if (this.runtime_musical_artist_services.is_artist_a_common_word(artist_match_key) == false) {
                    // video match key: ARTIST + SPACE + ANY WHOLE WORD + SPACE + "album"
                    // video match key: wallflowers full album lyrics
                    // resulting video: The Wallflowers (full album + lyrics)
                    if (video_match_key.match(new RegExp(artist_match_key + " " + "\\w+" + " album", "gi"))) { // \w = any whole word
                        return_value = true;
                    }
                    // video match key: the firm 1997 the album
                    // resulting video: The Firm (1997) "The Album"
                }
                else if (video_match_key.match(new RegExp("the album", "gi"))) {
                    return_value = true;
                }
            }
            return return_value;
        };
        // NOTE: These arguments are not used locally, but are passsed along during the
        // instantiation of Wikipedia Discography Services which does use them.
        this.online = online;
        this.offline_discographies = offline_discographies;
        this.write_output = write_output;
        this.node_js_response = node_js_response;
    }
    // My homemade Youtube Album object Part B, utility functions:
    // Job-stream:
    // NOTE: The "level_1_get_albums_artist()/level_2_get_albums_artist_attempt()" construct is just a
    // convenient way to isolate my error handling:
    // EXTERNAL INTERFACE 1 of 1:
    youtube_album.prototype.level_1_get_albums_artist = function () {
        if (this.debug_trace_process == true) {
            get_function_description("level_1_get_albums_artist");
        }
        // NOTE: This is the "atomic" processing level for catching "spare" (unplanned-for) errors.
        // (This particular location is due to my use of timer-based function calls.)
        try {
            // NOTE: The "level_1_get_albums_artist()/level_2_get_albums_artist_attempt()" construct is 
            // just a convenient way to isolate my error handling:
            this.level_2_get_albums_artist_attempt();
        }
        catch (e) {
            // Channel error info appropriately to "standard error" and "standard debug". The user can't
            // fix them but the developer can use the information to, perhaps, "fix" (ie, handle) them:
            standard_streams_services.write("error", "level_1_get_albums_artist() error for artist " +
                this.wikipedia_artist);
            standard_streams_services.write("debug", e.message);
        }
    };
    youtube_album.prototype.level_2_get_albums_artist_attempt = function () {
        if (this.debug_trace_process == true) {
            get_function_description("level_2_get_albums_artist_attempt");
        }
        // Reset:
        this.video_array_all = [];
        this.videoArrayFilteredByDuration = [];
        // Increment the "runtime loop" array index:
        this.runtime_loop_artist_array_index++;
        // If we come to the end of the "runtime loop" array:
        if (this.runtime_loop_artist_array_index > this.runtime_loop_artist_array.length - 1) {
            // Clear out:
            standard_streams_services.clear("message");
            // If no YouTube communication or content error occurred:
            if (this.error_code >= 0) {
                // Show the final output:
                switch (this.output_format) {
                    case "JSON":
                        var albums_JSON_string = JSON.stringify(this.artistVideosArray);
                        // Conform to the Database application's naming convention:
                        albums_JSON_string = replace_all(albums_JSON_string, "wikipediaArtist", "id");
                        albums_JSON_string = replace_all(albums_JSON_string, "videoArrayFilteredByDuration", "video");
                        // Show the JSON string itself for further testing and/or usage:
                        document.getElementById("output_json").style.visibility = "visible";
                        document.getElementById("output_json").value = albums_JSON_string;
                        break;
                    case "HTML":
                        // Let's clarify the component counts for readability:
                        var artists_searched_for = this.runtime_loop_artist_array.length;
                        var artists_found = this.artist_count;
                        var artists_found_percent = Math.round(((artists_found / artists_searched_for) * 100));
                        var albums_found = this.album_count;
                        var match_attempts = this.match_attempts;
                        var matches = this.matches;
                        var match_percent = Math.round(((matches / match_attempts) * 100));
                        // Assemble the counts:
                        var counts_HTML_string = "<br>" + "Artists searched for: " + artists_searched_for.toLocaleString();
                        counts_HTML_string += "<br>" + "Artists found: " + artists_found.toLocaleString() + " (" + artists_found_percent.toString() + "%)";
                        counts_HTML_string += "<br>" + "Albums found: " + albums_found.toLocaleString() + "<br>";
                        counts_HTML_string += "<br>" + "Match attempts: " + match_attempts.toLocaleString();
                        counts_HTML_string += "<br>" + "Matches: " + matches.toLocaleString() + " (" + match_percent.toString() + "%)" + "<br><br>";
                        // "Pre-pend" the counts to the HTML report:
                        this.albums_HTML_string = counts_HTML_string + this.albums_HTML_string;
                        // Show the report:
                        try {
                            // Node.js process 1 of 2:
                            // This is the Node.js process:
                            // This function is only defined and passed in the Node.js implementation, in file index.js:
                            this.write_output(this.albums_HTML_string);
                        }
                        catch (e) {
                            // This is the ASP process:
                            standard_streams_services.write("output", this.albums_HTML_string);
                        }
                        break;
                    default:
                }
                // NOTE:  Try/catch is used in case the calling function is being executed by Node.js in
                // which the GUI would not be available.
                try {
                    // Since the process is now complete:
                    document.getElementById("cancel").disabled = true;
                    document.getElementById("run").disabled = false;
                    document.getElementById("ButtonAbout").disabled = false;
                }
                catch (e) { }
            }
            // If we remain within the range of the "runtime loop" array:
        }
        else {
            //this.wikipedia_artist = this.runtime_loop_artist_array[this.runtime_loop_artist_array_index];
            //---------------------------------------------------------------------------------------------------------------------------
            // CROSS-REFERENCE A - The Four Seasons - A work-around made permanent.
            // Truncate starting at any parenthesis:
            // Eg: Wikipedia artist name "The Four Seasons (band)"
            //this.artist = truncate_bound_exclusive(this.wikipedia_artist, " (");
            this.wikipedia_artist = this.runtime_loop_artist_array[this.runtime_loop_artist_array_index];
            this.artist = truncate_bound_exclusive(this.wikipedia_artist, " (");
            this.artist_cored = this.runtime_musical_artist_services.get_artist_name_core(this.artist);
            this.artist_match_key = this.runtime_musical_artist_services.get_artist_match_key(this.artist_cored);
            //---------------------------------------------------------------------------------------------------------------------------
            // We will save this now and reference it later:
            this.video_artist_requires_quotes = this.runtime_musical_artist_services.does_video_artist_require_quotes(this.artist_match_key);
            // Update the form to reflect the ongoing statuses:
            if (this.runtime_loop_artist_array_index == 0) {
                // NOTE:  Try/catch is used in case the calling function is being executed by Node.js in
                // which the GUI would not be available.
                try {
                    // Enable the cancel button because the next part of Youtube Album services has
                    // detail-level cancel capability:
                    document.getElementById("cancel").disabled = false;
                }
                catch (e) { }
            }
            standard_streams_services.clear("message");
            // Inform the user what artist is being worked on:
            standard_streams_services.write("message", "Retrieving albums for " +
                this.wikipedia_artist +
                ".");
            // Node.js process 2 of 2:
            // This dummy write to the Node.js response serves to prevent the app from timing out on Node.js
            // and allows me to run for many artists rather than only the 1 or 2 I could get otherwise:
            try {
                this.node_js_response.write("<div></div>");
            }
            catch (e) { }
            // Get the artist's discography in the form of two combined-section album arrays:
            // NOTE: The Wikipedia Discography process was originally written such that an error in searching
            // for discographies for one artist would terminate the entire batch for all artists.  This was
            // subsequently corrected.  As presently constructed, in such situations, the arrays studio_array[]
            // and concert_array[] can come back empty.  My original intent was to terminate processing for the
            // artist in such cases.  Testing revealed that this was a bad idea because the Greatest Hits search
            // process does not require a discography at all in order to work.  Thus, I will allow the process to
            // continue, knowing that, though these arrays may be empty, I can still get hits (pun intended) on
            // the Greatest Hits lookup.  Knowledge of this can, and will, greatly enhance my ability to demo the
            // application because I can search for, basically, any artist.
            // Get the two resultant arrays:
            var discography_detail_object = 
            // "Render unto Caesar the things that are Caesar's."  Pass a valid Wikipedia artist
            // name to a Wikipedia artist process:
            this.runtime_wikipedia_discography_services.get_discography_arrays_from_JSON_string(this.wikipedia_artist, this.runtime_all_artists_discog_JSON_string, this.studio_selected, this.concert_selected);
            // Get other important information that we will need later:
            if (this.discography_contains_eponymous_album(this.artist_match_key, discography_detail_object.studioAlbumArray) > -1) {
                this.discog_contains_eponymous_album = true;
            }
            else {
                this.discog_contains_eponymous_album = false;
            }
            // Optimize the discography arrays to handle partial matches, especially on short album
            // titles, and eponymous albums:  
            this.studio_album_array_optimized =
                this.optimize_album_array_for_search(this.artist_match_key, discography_detail_object.studioAlbumArray);
            this.concert_album_array_optimized =
                this.optimize_album_array_for_search(this.artist_match_key, discography_detail_object.concertAlbumArray);
            // Pass the optimized arrays to the next stage where we determine if there is a match
            // between them and YouTube.  If there are, we will present the matches to the user
            // (thus providing the benefit that the application is designed to furnish).        
            this.level_3_maybe_write_video_pages(this.wikipedia_artist, this.artist_match_key);
            // If no YouTube communication or content error occurred:
            if (this.error_code >= 0) {
                if (this.studio_selected == true) {
                    // Basically, go get all known versions of The Beatles "The White Album" and write them
                    // as hardcoded data:
                    this.write_hardcoded_studio_albums_by_artist(this.artist_match_key);
                }
            }
            // "Recursive" call:
            setTimeout(function () { this.level_1_get_albums_artist(); }.bind(this), 100); // 100 millisecond
        }
    };
    // NOTE: This function is the "job-stream" for the actual XML/HTTP GET-ting of YouTube Gdata info via
    // cross-origin resource sharing (CORS).  Video detail info is returned in JavaScript object notation
    // (JSON) format.
    youtube_album.prototype.level_3_maybe_write_video_pages = function (wikipedia_artist, artist_match_key) {
        // The "maybe" is because it needs to have all of this info from YouTube before it can make the
        // decision as to whether or not we want the video.
        if (this.debug_trace_process == true) {
            get_function_description("level_3_maybe_write_video_pages");
        }
        // Assemble the Artist component:
        // NOTE: We need to show the Wikipedia artist name because that is how the results are sorted
        // and, otherwise, the "The " entries would be out of place:
        this.albums_HTML_string += '<br><span id="artist">' + wikipedia_artist + '</span><br><br>';
        // Reformat for querying:
        var query_artist = artist_match_key.toLowerCase();
        query_artist = query_artist.split(" ").join("+"); // string replacement via split/join
        // Eg: simon+%26+garfunkel
        query_artist = query_artist.split("&").join("%26"); // string replacement via split/join
        //--------------------------------------------------------------------------------------------------
        // Eg: query_artist   = "10,000+maniacs"
        // Eg: artist_match_key  = "10,000 Maniacs"
        // Save this for comparison after the loop:
        this.saved_album_count = this.album_count;
        //----------------------------------------------------------------------------------------------------
        // Get the full YouTube multi-page package of videos.  Chaining via "next page" affects a linked-list.
        // Here is a handy processing guide:
        //  Query   Function
        //  -----   --------
        //    1     step_A_get_youtube_videos_first_page
        //    2     step_B_get_youtube_videos_subsequent_pages   
        //    3     step_C_get_youtube_duration_page
        //----------------------------------------------------------------------------------------------------
        // Query 1 of 3: YouTube video detail info, the first page-load:
        var next_page_token = this.step_A_get_youtube_videos_first_page(query_artist, artist_match_key);
        // If the first page points to a second page:
        if (next_page_token != "") {
            // Query 2 of 3: YouTube video detail info, subsequent page-loads:
            this.step_B_get_youtube_videos_subsequent_pages(query_artist, artist_match_key, next_page_token);
        }
        // If no YouTube communication or content error occurred:
        if (this.error_code >= 0) {
            if (this.video_array_all.length > 0) {
                // Query 3 of 3: YouTube video durations, all page-loads.  Go back and set the durations of every
                // video that has survived the winnowing: 
                this.step_C_get_youtube_durations();
                // If no YouTube communication or content error occurred:
                if (this.error_code >= 0) {
                    // Now that we have durations, we can use them to further winnow our dataset:
                    this.step_D_edit_based_on_durations();
                    switch (this.output_format) {
                        // Fully winnowed, it's now time to write our report simply by unloading our final dataset:
                        case "JSON":
                            // NOTE: The structure and naming of these arrays exactly match the schema
                            // definition used for these "tables" in my database application and all/any
                            // databases I create:
                            if (this.videoArrayFilteredByDuration.length > 0) {
                                // This array contains the artist's videos.  Load it for this artist:
                                var artistVideosObject = { wikipediaArtist: wikipedia_artist, videoArrayFilteredByDuration: this.videoArrayFilteredByDuration };
                                // This array contains all artist's videos, from which we will generate
                                // the final JSON:
                                this.artistVideosArray.push(artistVideosObject);
                            }
                            break;
                        case "HTML":
                            this.step_E_final_write();
                            break;
                        default:
                    }
                }
            }
        }
        // If the above found at least one album...
        if (this.album_count > this.saved_album_count) {
            //...increment:
            this.artist_count++;
        }
    };
    youtube_album.prototype.level_5_video_title_contains_album_title = function (video_match_key, artist_match_key, albums) {
        if (this.debug_trace_process == true) {
            get_function_description("level_5_video_title_contains_album_title");
        }
        var match_index = -1; // init
        for (var i = 0; i < albums.length; i++) {
            // Step D: Get the Wikipedia album title match key:
            var album_match_key = this.runtime_musical_artist_services.get_title_match_key(albums[i], artist_match_key);
            // NOTE: Sometimes what seems like an album match is really a live album or homemade video from a tour that supported or coincided
            // with the release of the album.  As such, it is a false positive and should be neutralized.
            // Eg: Bob Seger & The Silver Bullet Band - The Distance Tour 1983.
            // NOTE 2: I could have, but chose not to, appended the words "concert" or "live" to the title so it would be picked up in a query
            // for which concert albums have been requested.
            video_match_key = video_match_key.replace(new RegExp(album_match_key + " tour", "gi"), "album tour");
            // Eg: Beach Boys - Pet Sounds cover...
            video_match_key = video_match_key.replace(new RegExp("cover of " + album_match_key, "gi"), "album cover");
            video_match_key = video_match_key.replace(new RegExp(album_match_key + " cover", "gi"), "album cover");
            // Eg: Alanis Morissette...From Jagged Little Pill to Flavors of Entanglement...
            video_match_key = video_match_key.replace(new RegExp("from " + album_match_key, "gi"), "from album");
            video_match_key = video_match_key.replace(new RegExp("to " + album_match_key, "gi"), "from album");
            // If the album title is a subset of the artist's name...  
            // NOTE: It is very common for artists to name albums this way: "Alanis" (Morissette), "Dylan" (Bob), "Clapton" (Eric),
            // "McCartney" (Paul), "Diana" (Ross), "Frampton" (Peter), "Ringo" (Starr), "Todd" (Rundgren) and "Tom" (Jones).
            if (subset(artist_match_key, album_match_key) == true) { // look_in, look_for          
                //...remove all instances of the artist's full name from the video title to take it out of the equation, otherwise the
                // match to follow will generate all false positives, since having the artist's name in the video title is a prerequisite
                // for being here:
                video_match_key = remove_all_procedural(video_match_key, artist_match_key); // look_in, look_for
                video_match_key = consolidate_extraneous_spaces(video_match_key);
            }
            // Step E: Try to find the Wikipedia album title in the YouTube video title by way of their match keys:
            if (this.intelligent_match_found(video_match_key, album_match_key)) { // look_in_match_key, look_for_match_key
                match_index = i;
                // End the FOR loop now:
                break;
            }
        }
        var album_match_key_output = ""; // init
        if (match_index != -1) {
            album_match_key_output = this.runtime_musical_artist_services.get_title_match_key(albums[match_index], artist_match_key);
        }
        return album_match_key_output;
    };
    youtube_album.prototype.step_A_get_youtube_videos_first_page = function (query_artist, artist_match_key) {
        //-----------------------------------------------------------------------------
        // Built-in development tool:
        var youtube_gdata_developer_key;
        if (this.force_error_youtube_videos_first == true) {
            youtube_gdata_developer_key = "xxx";
        }
        else {
            youtube_gdata_developer_key = YOUTUBE_GDATA_DEVELOPER_KEY;
        }
        //-----------------------------------------------------------------------------
        // A small group of artists need to use "exact match" querying, ie, in quotes:
        if (this.video_artist_requires_quotes == true) {
            query_artist = '"' + query_artist + '"';
        }
        var QUERY_DESCRIPTION = "Query 1 of 3: YouTube video detail info, the first page-load";
        var url_to_get = YOUTUBE_GDATA_QUERY_SEARCH_PREFIX +
            "?key=" + youtube_gdata_developer_key +
            "&part=snippet" +
            "&type=video" +
            "&order=relevance" +
            // NOTE: Video duration check 1 of 2.  This YouTube API "filter" works for about
            // 95% of the videos but "leaks" for the other 5%.  Those must be filtered out,
            // again, manually by me, at a later point in the process:
            "&filters=long" + // "long" means a minimum of 20 minutes
            "&lclk=long" +
            // This parameter uses a one-based index, meaning the first result is 1, etc:
            "&start-index=1" +
            "&maxResults=" + YOUTUBE_ITEMS_PER_PAGE.toString() +
            "&v=3" +
            "&q=" + query_artist + YOUTUBE_GDATA_QUERY_QUALIFIER;
        // Get the first page-load:
        var next_page_token = this.get_youtube_page_detail(artist_match_key, url_to_get, QUERY_DESCRIPTION);
        // This chaining affects a linked-list:
        return next_page_token;
    };
    youtube_album.prototype.step_B_get_youtube_videos_subsequent_pages = function (query_artist, artist_match_key, next_page_token) {
        //---------------------------------------------------------------------
        // Built-in development tool:
        var youtube_gdata_developer_key;
        if (this.force_error_youtube_videos_subsequent == true) {
            youtube_gdata_developer_key = "xxx";
        }
        else {
            youtube_gdata_developer_key = YOUTUBE_GDATA_DEVELOPER_KEY;
        }
        //---------------------------------------------------------------------
        // Since we will be modifying the argument, let's make a copy and work with that:
        var next_page_token_edited = next_page_token;
        var QUERY_DESCRIPTION = "Query 2 of 3: YouTube video detail info, subsequent page-loads";
        // Assemble:
        var gdata_query_subsequent_pages_base = YOUTUBE_GDATA_QUERY_SEARCH_PREFIX +
            "?key=" + youtube_gdata_developer_key +
            "&part=snippet" +
            "&type=video" +
            "&maxResults=" + YOUTUBE_ITEMS_PER_PAGE.toString() +
            "&v=3" +
            "&q=" +
            query_artist +
            YOUTUBE_GDATA_QUERY_QUALIFIER;
        var url_to_get;
        // This chaining affects a linked-list:
        while (next_page_token_edited != "") {
            // Determine the next page-load:
            url_to_get = gdata_query_subsequent_pages_base + "&pageToken=" + next_page_token_edited;
            // Get the next page-load:
            next_page_token_edited = this.get_youtube_page_detail(artist_match_key, url_to_get, QUERY_DESCRIPTION);
        }
    };
    youtube_album.prototype.step_C_get_youtube_durations = function () {
        // Calculate how many pages it will take to operate on the contents of this array:
        var total_pages = get_array_pages(this.video_array_all.length, // total_results
        YOUTUBE_ITEMS_PER_PAGE // results_per_page
        );
        // Set the durations of every video that has survived the winnowing so far.
        for (var i = 1; i <= total_pages; i++) {
            // Query 3 of 3: YouTube video durations, all page-loads:
            // For each page-load of data:
            this.step_C_get_youtube_duration_page(i); // page_number
            // If a YouTube communication or content error occurred:
            if (this.error_code < 0) {
                break;
            }
        }
    };
    youtube_album.prototype.step_C_get_youtube_duration_page = function (page_number) {
        //---------------------------------------------------------------------
        // Built-in development tool:
        var youtube_gdata_developer_key;
        if (this.force_error_youtube_duration == true) {
            youtube_gdata_developer_key = "xxx";
        }
        else {
            youtube_gdata_developer_key = YOUTUBE_GDATA_DEVELOPER_KEY;
        }
        //---------------------------------------------------------------------
        var page_start_index;
        // Get the boundaries of the page:
        if (page_number == 1) {
            page_start_index = 0;
        }
        else {
            page_start_index = (page_number - 1) * YOUTUBE_ITEMS_PER_PAGE;
        }
        // Convert the page number (base 1) to array (base 0);
        var page_end_index = page_start_index + YOUTUBE_ITEMS_PER_PAGE - 1;
        //---------------------------------------------------------------------------------------------------------
        var QUERY_DESCRIPTION = "Query 3 of 3: YouTube video durations, all page-loads";
        var url_to_get_base = YOUTUBE_GDATA_QUERY_VIDEOS_PREFIX +
            "?key=" + youtube_gdata_developer_key +
            "&part=contentDetails";
        // Declare/init:
        var url_to_get = url_to_get_base;
        //---------------------------------------------------------------------------------------------------------
        // Load the video id list:
        // Eg: "&id=h0qRqZTXNks,6I4ezGXVx84"
        var video_id_list = "";
        for (var i = page_start_index; i <= page_end_index; i++) {
            // Pre-pend the appropriate indicator:
            if (i == page_start_index) {
                video_id_list += "&id=";
            }
            else {
                video_id_list += ",";
            }
            // NOTE: If, for the last page-load of data, our result does not end on a clean page boundary,
            // this reference will fail.  I find this cleaner than figuring out "page_end_index" manually.
            // I'll just let it fail, and continue on my merry way:
            try {
                // Append the video id:
                video_id_list += this.video_array_all[i].videoId;
            }
            catch (e) { }
        }
        //---------------------------------------------------------------------------------------------------------
        // Assemble the final URL:
        url_to_get += video_id_list;
        // NOTE: We now have a URL that will get us the durations of every video that has survived the winnowing so far.
        // We do this together, now, because this allows us to make the fewest possible "network IOs".  If the original
        // filter had not leaked, we would have no reason to lookup the duration at all, except that it is a very helpful
        // piece of information to present to the end-user.
        //----------------------------------------------------------------------------------------
        // {  
        //    "error":{  
        //       "errors":[  
        //          {  
        //             "domain":"youtube.parameter",
        //             "reason":"missingRequiredParameter",
        //             "message":"No filter selected.",
        //             "locationType":"parameter",
        //             "location":""
        //          }
        //       ],
        //       "code":400,
        //       "message":"No filter selected."
        //    }
        // }
        //----------------------------------------------------------------------------------------
        // NOTE: This is the response generated:
        //
        // {  
        //     "kind":"youtube#videoListResponse",
        //     "etag":"\"dhbhlDw5j8dK10GxeV_UG6RSReM/nS40ku54NdCC-U2T_3EOJ5ChjZY\"",
        //     "pageInfo":{  
        //         "totalResults":2,
        //         "resultsPerPage":2
        //     },
        //     "items":[  
        //         {  
        //             "kind":"youtube#video",
        //             "etag":"\"dhbhlDw5j8dK10GxeV_UG6RSReM/i8Nk37PZLbbNDXbKqNbIcgUCtPo\"",
        //             "id":"h0qRqZTXNks",
        //             "contentDetails":{  
        //                 "duration":"PT8M52S",
        //                 "dimension":"2d",
        //                 "definition":"hd",
        //                 "caption":"false",
        //                 "licensedContent":true,
        //                 "regionRestriction":{  
        //                     "allowed":[  
        //                         "GB",
        //                         "PT",
        //                         "IT",
        //                         "ES",
        //                         "FI",
        //                         "IE",
        //                         "US"
        //                     ]
        //                 }
        //             }
        //         },
        //         {  
        //             "kind":"youtube#video",
        //             "etag":"\"dhbhlDw5j8dK10GxeV_UG6RSReM/UVIsMJyAE-U9_rFhSce7nL81Hm4\"",
        //             "id":"6I4ezGXVx84",
        //             "contentDetails":{  
        //                 "duration":"PT3M35S",
        //                 "dimension":"2d",
        //                 "definition":"hd",
        //                 "caption":"false",
        //                 "licensedContent":false,
        //                 "regionRestriction":{  
        //                     "blocked":[  
        //                         "DE"
        //                     ]
        //                 }
        //             }
        //         }
        //     ]
        // }
        //
        //----------------------------------------------------------------------------------------
        // Get the durations (in seconds) of the artists albums.
        // Get the multi-video page-load:
        // Get the results of our YouTube query by executing it and examining the result looking for errors.
        // If any are found, they will be handled inside the function.  Otherwise, we will receive an
        // instantiated JSON object:
        var request_response_JSON_object = this.get_youtube_response_JSON_object(url_to_get, QUERY_DESCRIPTION);
        var duration_ISO_format_string;
        var duration_seconds;
        var video_array_index = page_start_index; // init
        // If no YouTube communication or content error occurred:
        if (this.error_code >= 0) {
            // Step 1, assign the duration seconds:
            for (var j = 0; j < request_response_JSON_object.items.length; j++) {
                // Get the duration as an ISO string:
                duration_ISO_format_string = request_response_JSON_object.items[j].contentDetails.duration;
                // Re-format the duration into its total seconds:
                duration_seconds = get_seconds_from_ISO_duration(duration_ISO_format_string);
                // Assign the duration seconds:
                this.video_array_all[video_array_index].seconds = duration_seconds;
                // Increment for the next time through the loop:
                video_array_index++;
            }
        }
    };
    youtube_album.prototype.step_D_edit_based_on_durations = function () {
        // This matches the YouTube "filter":
        var LONG_VIDEO_MINUTES = 20;
        // Minutes x 60 seconds:
        var long_video_duration_seconds = LONG_VIDEO_MINUTES * 60;
        for (var i = 0; i < this.video_array_all.length; i++) {
            // If the video is considered "long" by YouTube:
            if (this.video_array_all[i].seconds >= long_video_duration_seconds) {
                this.videoArrayFilteredByDuration.push(this.video_array_all[i]);
            }
            ;
        }
    };
    youtube_album.prototype.step_E_final_write = function () {
        for (var i = 0; i < this.videoArrayFilteredByDuration.length; i++) {
            // Append the video's detail information to a row on the form:
            this.write_album(this.videoArrayFilteredByDuration[i].videoId, this.videoArrayFilteredByDuration[i].title, this.videoArrayFilteredByDuration[i].description, this.videoArrayFilteredByDuration[i].image, this.videoArrayFilteredByDuration[i].seconds);
        }
    };
    // NOTE: The following lower level functions are shown in alphabetical order:
    youtube_album.prototype.alter_video_to_include_or_exclude = function (video_match_key, artist_match_key) {
        // Since we will be modifying the argument, let's make a copy and work with that:
        var video_match_key_edited = video_match_key;
        // NOTE: Generally speaking, these avert/handle 1) false positives, 2) missed matches, 3) album peculiarities,
        // 4) common words (heart, journey, etc), 5) videos that seem like albums but aren't and 6) musical covers
        // and tributes.
        // NOTE 2: I understand it is a fool's errand to actually repair videos that were titled in such a way that
        // they are immune to my matching methodology.  However, all such videos (for my known artists) were investigated
        // and the fixes were know to me, so it was a question of did I want to throw away these videos and, in so doing,
        // lose albums I could otherwise have had (and listened to!).  Or to have done the reverse: carried crappy vidoes
        // that tended to look bad and stink up my demos!
        // String replacement via split/join:
        switch (artist_match_key) {
            case "abba":
                // This was getting flagged as an eponymous album:
                video_match_key_edited = video_match_key_edited.replace(new RegExp("plays abba", "gi"), "plays");
                break;
            case "above beyond":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("were all we need", "gi"), "we are all we need");
                break;
            case "alanis morissette":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Bonus Live CD", "gi"), "Bonus CD");
                break;
            case "bachman turner overdrive":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("japan tour", "gi"), "live japan tour");
                break;
            case "beatles":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Love Songs To The Beatles", "gi"), "Love Songs"); // Mary Wells
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Songs Of The Beatles", "gi"), "Songs"); // Sarah Vaughan
                video_match_key_edited = video_match_key_edited.replace(new RegExp("songs of the beatles", "gi"), "songs"); // Sarah Vaughan
                break;
            case "cher":
                // This 1968 album was released under two different names.  Wikipedia shows it
                // as "Backstage" so this will allow us to find either one:
                video_match_key_edited = video_match_key_edited.replace(new RegExp("This Is Cher", "gi"), "Backstage");
                break;
            case "david bowie":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Julia Stone David Bowie", "gi"), "Julia Stone");
                break;
            case "eagles":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Hotel California LA", "gi"), "LA"); // FIXED - test
                break;
            case "faces":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("faces records", "gi"), "records");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("sarabande faces", "gi"), "sarabande");
                break;
            case "frankie valli":
                // A typo!:
                video_match_key_edited = video_match_key_edited.replace(new RegExp("VALLI The Album", "gi"), "frankie valli - VALLI The Album");
                break;
            case "genesis":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Deep from the Heart", "gi"), "");
                break;
            case "graham parker":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("graham parker the rumours full album", "gi"), "graham parker the rumours stick to me full album");
                break;
            case "gwen stefani":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Baby Dont Lie", "gi"), "greatest hits");
                break;
            case "hall oates":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("BIGBAMBOOM", "gi"), "BIG BAM BOOM");
                break;
            case "heart":
                // Blue Rockin' - Deep from the Heart (Crazy Love Records)...
                video_match_key_edited = remove_all_procedural(video_match_key_edited, "Deep from the Heart");
                break;
            case "jefferson airplane":
                // This is a movie/video, not an album:
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Jefferson Airplane Fly Jefferson Airplane", "gi"), "Fly");
                break;
            case "jethro tull":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("20 Years Of Jethro Tull", "gi"), "20 Years Of Jethro Tull Greatest Hits");
                break;
            case "john denver":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Higher Ground TV", "gi"), "TV");
                break;
            case "kansas":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("kansas city", "gi"), "city");
                break;
            case "middle east":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("middle eastern", "gi"), "");
                break;
            case "molly hatchet":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Beating The Odds", "gi"), "Beatin The Odds");
                break;
            case "natalie merchant":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Our Time In Eden", "gi"), "natalie merchant Our Time In Eden");
                break;
            case "renaissance":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Renaissance Sound", "gi"), "Sound");
                break;
            case "seal":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("seventh seal", "gi"), "seventh");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("7th seal", "gi"), "7th");
                break;
            case "squeeze":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Velvet Underground Squeeze", "gi"), "Velvet Underground");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("One More Squeeze", "gi"), "One More");
                break;
            case "sudha":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Aseker Sudha", "gi"), "Aseker");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("sudha Telugu", "gi"), "Telugu");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Sudha Rani", "gi"), "Rani");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Sudha Kumari", "gi"), "Kumari");
                break;
            case "sweet":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("sweet borderliner", "gi"), "borderliner");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("sweet dreams", "gi"), "dreams");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("sweet revenge", "gi"), "revenge");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("sweet summer", "gi"), "summer");
                break;
            case "temptations":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("The Temptations Show", "gi"), "Show");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("The Drones further temptations", "gi"), "The Drones further");
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Beyond Temptations", "gi"), "Beyond");
                break;
            case "the beat":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("THE COMPLETE I JUST CANT STOP IT", "gi"), "I JUST CANT STOP IT");
                break;
            case "the guess who":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("The Guess Who Guns Rain Dance 70s Flashback", "gi"), "Guns Rain Dance 70s Flashback");
                break;
            case "the tubes":
                // This is the eponymous album: "Tubes - MFSL Aluminum CD - Full Album 1975 (MFCD 822)"
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Tubes MFSL Aluminum", "gi"), "The Tubes The Tubes");
                break;
            case "toto":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("Toto Cutugno", "gi"), "Cutugno");
                break;
            case "u2":
                video_match_key_edited = video_match_key_edited.replace(new RegExp("CD U2 Production", "gi"), "CD Production ");
                break;
            default:
        }
        // Tidy up:
        video_match_key_edited = consolidate_extraneous_spaces(video_match_key_edited);
        return video_match_key_edited;
    };
    youtube_album.prototype.cancel_query = function () {
        // NOTE:  Try/catch is used in case the calling function is being executed by Node.js in
        // which the GUI would not be available.
        try {
            // Disable the cancel button:
            document.getElementById("cancel").disabled = true;
        }
        catch (e) { }
        // Clear the "is running" message:
        // NOTE: This does not need to be paired with a timer-based call because, as the last
        // statement in the job-stream, it will be visible to the user:
        standard_streams_services.clear("message");
        // Force the end-of-loop condition:
        this.runtime_loop_artist_array_index = this.runtime_loop_artist_array.length + 99;
    };
    youtube_album.prototype.discography_contains_eponymous_album = function (artist_match_key, albums) {
        var match_index = -1; // init
        for (var i = 0; i < albums.length; i++) {
            var album_match_key = this.runtime_musical_artist_services.get_title_match_key(albums[i], artist_match_key);
            if (artist_match_key == album_match_key) {
                match_index = i;
                // End the FOR loop now:
                break;
            }
        }
        return match_index;
    };
    youtube_album.prototype.get_youtube_page_detail = function (artist_match_key, url_to_get, description) {
        //-----------------------------------------------------------------------------------------------
        // NOTE: This is the response generated:
        //
        //  {  
        //    "kind":"youtube#searchListResponse",
        //    "etag":"\"eYE31WLho912TfxEBDDRSwEQ5Ms/dTJCYupfDEDEfoOUQt7tYd_Slm0\"",
        //    "nextPageToken":"CDIQAA",
        //    "pageInfo":{  
        //       "totalResults":7337,
        //       "resultsPerPage":50
        //    },
        //    "items":[  
        //       {  
        //          "kind":"youtube#searchResult",
        //          "etag":"\"eYE31WLho912TfxEBDDRSwEQ5Ms/UBPV_uPQ-AKECRsqX45wUVUL2oc\"",
        //          "id":{  
        //             "kind":"youtube#video",
        //             "videoId":"mFBEtkLoxKw"
        //          },
        //          "snippet":{  
        //             "publishedAt":"2014-12-23T01:56:58.000Z",
        //             "channelId":"UCXJZol8HZzTz-XZUYGlXTVA",
        //             "title":"10000 Maniacs",
        //             "description":"Full CD RIP .wav 10000 Maniacs - Our Time in Eden 1 \"Noah's Dove\" – 4:29 2 \"These Are Days\" (Robert Buck, Merchant) – 3:40 3 \"Eden\" (Jerome Augustyniak, Dennis Drew, Steven ...",
        //             "thumbnails":{  
        //                "default":{  
        //                   "url":"https:// i.ytimg.com/vi/mFBEtkLoxKw/default.jpg"
        //                },
        //                "medium":{  
        //                   "url":"https:// i.ytimg.com/vi/mFBEtkLoxKw/mqdefault.jpg"
        //                },
        //                "high":{  
        //                   "url":"https:// i.ytimg.com/vi/mFBEtkLoxKw/hqdefault.jpg"
        //                }
        //             },
        //             "channelTitle":"",
        //             "liveBroadcastContent":"none"
        //          }
        //       },
        //       {  
        //          "kind":"youtube#searchResult",
        //          "etag":"\"eYE31WLho912TfxEBDDRSwEQ5Ms/Ee04LFlKjP8XX1OkW2lMgRTDZuw\"",
        //          "id":{  
        //             "kind":"youtube#video",
        //             "videoId":"3RPHAYIk5dI"
        //          },
        //          "snippet":{  
        //             "publishedAt":"2014-10-02T02:47:02.000Z",
        //             "channelId":"UCVgh34NL_TW9Dy1He2IZarQ",
        //             "title":"10,000 Maniacs. Live at JCC. Jamestown, NY 7/29/86",
        //             "description":"10000 Maniacs. Live at Jamestown Community College. Jamestown, NY 7/29/86. Jamestown Centennial Celebration. Broadcast on local cable.",
        //             "thumbnails":{  
        //                "default":{  
        //                   "url":"https:// i.ytimg.com/vi/3RPHAYIk5dI/default.jpg"
        //                },
        //                "medium":{  
        //                   "url":"https:// i.ytimg.com/vi/3RPHAYIk5dI/mqdefault.jpg"
        //                },
        //                "high":{  
        //                   "url":"https:// i.ytimg.com/vi/3RPHAYIk5dI/hqdefault.jpg"
        //                }
        //             },
        //             "channelTitle":"",
        //             "liveBroadcastContent":"none"
        //          }
        //       }
        //    ]
        // }
        //-----------------------------------------------------------------------------------------------
        // Get the artists albums.
        // Eg: artist_match_key = "10,000 Maniacs"
        // Get the first page-load:
        // Get the results of our YouTube query by executing it and examining the result looking for errors.
        // If any are found, they will be handled inside the function.  Otherwise, we will receive an
        // instantiated JSON object:
        var request_response_JSON_object = this.get_youtube_response_JSON_object(url_to_get, description);
        var next_page_token;
        // If a YouTube communication or content error occurred:
        if (this.error_code < 0) {
            // Force the end-of-query condition:
            next_page_token = "";
            // If no YouTube communication or content error occurred:
        }
        else {
            // With no error, continue processing:
            // Inner, detail loop:
            // Do a match between the YouTubeAlbum response and the WikipediaDiscography discography. If at least one is
            // found, create an HTML detail row containing the results. A match consists of the following:  If the artist's
            // name is found in the title, and the video is in the artist's list of albums, write the video's detail info
            // to the array "video_array_all" from which it may eventually find its final destination, a row in the form
            // (assuming it can pass the duration test):
            this.level_4_write_video_core_inclusion_test(artist_match_key, request_response_JSON_object);
            // Determine the next page-load:
            next_page_token = request_response_JSON_object.nextPageToken;
            if (next_page_token == null) {
                // This is the normal end-of-query condition:
                next_page_token = "";
            }
        }
        // This chaining affects a linked-list:
        return next_page_token;
    };
    youtube_album.prototype.get_youtube_response_JSON_object = function (url_to_get, description) {
        // Get the results of our YouTube query in the form of an instantiated JSON object:
        //----------------------------------------------------------------------------------------
        // NOTE: This is the error generated when a proper YouTube developer key is not supplied:
        // {  
        //     "error":{  
        //         "errors":[  
        //             {  
        //             "domain":"usageLimits",
        //             "reason":"keyInvalid",
        //             "message":"Bad Request"
        //             }
        //         ],
        //         "code":400,
        //         "message":"Bad Request"
        //     }
        // }
        //----------------------------------------------------------------------------------------
        // Execute the query and examine the result looking for errors.  If any are found,
        // set the error fields, "this.error_code" and "this.error_message":
        var request_response_text = get_XML_HTTP_request_response_text(url_to_get, description);
        // Convert the response, turning our "flat" JSON string into a "live" JavaScript object:
        var request_response_JSON_object = JSON.parse(request_response_text);
        return request_response_JSON_object;
    };
    youtube_album.prototype.intelligent_match_found = function (look_in_match_key, look_for_match_key) {
        if (this.debug_trace_process == true) {
            get_function_description("intelligent_match_found");
        }
        if (this.debug_trace_matching == true) {
            this.write_debug(look_for_match_key);
            this.write_debug(look_in_match_key);
        }
        // NOTE: "Intelligent matching" is the use of "match keys".  Intelligent matching increased the
        // yield by 7% over straight matching.
        var match_found = false; // init
        this.match_attempts++;
        if (look_in_match_key.match(new RegExp(look_for_match_key, "gi"))) { // global, case-insensitive,  whole word/not substring
            match_found = true;
            this.matches++;
            if (this.debug_trace_matching == true) {
                this.write_debug("match");
            }
        }
        else {
            if (this.debug_trace_matching == true) {
                this.write_debug("no match");
            }
        }
        if (this.debug_trace_matching == true) {
            this.write_debug("----------------");
        }
        return match_found;
    };
    youtube_album.prototype.is_video_a_greatest_hits = function (video_match_key) {
        var return_value = false; // init
        // Alter the title to exclude these:
        video_match_key = video_match_key.replace(new RegExp("Best Of Both", "gi"), "Both");
        video_match_key = video_match_key.replace(new RegExp("Best Selection", "gi"), "Selection");
        video_match_key = video_match_key.replace(new RegExp("Complete Album", "gi"), "Album");
        video_match_key = video_match_key.replace(new RegExp("Great Woods", "gi"), "Mansfield");
        video_match_key = video_match_key.replace(new RegExp("Songs Concert", "gi"), "Concert");
        video_match_key = video_match_key.replace(new RegExp("Top of the Pops", "gi"), "Pops");
        video_match_key = video_match_key.replace(new RegExp("complete album", "gi"), "album");
        video_match_key = video_match_key.replace(new RegExp("complete trailer", "gi"), "trailer");
        video_match_key = video_match_key.replace(new RegExp("", "gi"), "");
        // NOTE: Many of these were not needed until I encountered the full-blown, external discography of The Beatles.
        // They are the definitive test artist to use for "greatest hits" processing:
        var greatest_hits_indicator = [
            "albums",
            "all time",
            "anthology",
            "anthologies",
            "ballads",
            "best",
            "box",
            "classic",
            "collected",
            "collection",
            "compilation",
            "essential",
            "essentials",
            "finest",
            "flashback",
            "four by",
            "gold disc",
            "gold disk",
            "great",
            "greatest",
            "hit",
            "hits",
            "k tel",
            "ktel",
            "memories",
            "million seller",
            "number 1",
            "number one",
            "past masters",
            "rarities",
            "recordings",
            "records",
            "retrospective",
            "singles",
            "timeless songs",
            "the compleat",
            "the complete",
            "the definitive",
            "the legendary",
            "the sound of",
            "top"
        ];
        for (var i = 0; i < greatest_hits_indicator.length; i++) {
            if (video_match_key.match(new RegExp("\\b" + greatest_hits_indicator[i] + "\\b", "gi"))) {
                return_value = true;
                // End the FOR loop now:
                break;
            }
        }
        return return_value;
    };
    youtube_album.prototype.is_video_artist_a_place_name = function (artist_match_key, video_match_key) {
        var return_value = false; // init
        if (this.runtime_musical_artist_services.is_artist_a_place_name(artist_match_key) == true) {
            if (video_match_key.match(new RegExp("in " + artist_match_key, "gi")) || // Kansas live in chicago...
                video_match_key.match(new RegExp("in the " + artist_match_key, "gi")) || // Eg: ...Live in the Chicago Auditorium
                video_match_key.match(new RegExp("at " + artist_match_key, "gi")) || // James Brown - Live at Boston Garden...
                video_match_key.match(new RegExp("at the " + artist_match_key, "gi"))) { // Eg: ...Concert at the Boston Tea Party    
                // The match is illegitimate because it was really a place name, not a band:
                return_value = true;
            }
        }
        return return_value;
    };
    // NOTE: I want to make these fix-related edits generic so as to get the benefit of them in the future
    // for any future artists.  The two contending issues are 1) efficiency vs. 2) future benefit.
    // The efficiency trade-off: "is_video_invalid_all_artists()" will bestow the most benefit to any future
    // artist at the cost of repeated, unneeded, inefficient executions.  "is_video_invalid_by_artist()" will
    // execute less often, thus more efficiently, but will bestow no benefit to any future artist.
    youtube_album.prototype.is_video_invalid_all_artists = function (artist_match_key, video_match_key) {
        // Since we are matching album titles to video titles we are casting a net that also brings in some
        // unintended catches: videos that are about the album rather than actually being the album soundtrack.
        // Fortunately, such videos are few and are easily screened out:
        var invalid_video = [
            // NOTE: "album review" seems to be some kind of standard, either imposed or de facto, though I was
            // concerned that I would find just "review" in some places.  On examination, this was not the case: 
            // album review, in depth review, prog review, time review  
            //  video "Steely Dan Umbria Jazz Festival 2009" because: Umbria Jazz =
            //  UmbriaJazz = umbriajazz = umbri + aja + zz in "intelligent matching"
            "decades of rock",
            "rehearsal",
            "behind the scenes",
            "classic albums",
            "cut for TV",
            "deeper with",
            "documentary",
            "rockumentary",
            "in the studio",
            "james keach",
            "meet the musicians",
            "tv special",
            "talks about",
            "talks at",
            "talks to",
            "making of",
            "tjr",
            "8 bit",
            "albumben",
            "album of the day",
            "alexb",
            "alternate version",
            "angehrt",
            "commentary",
            "como tocar",
            "ccp ep",
            "dj ambrosia",
            "downmix",
            "down mix",
            "drumcover",
            "erik scott",
            "fan remaster",
            "full movie",
            "guitar lesson",
            "how to play",
            "incorrect speed",
            "live from dennis house",
            "live listen",
            "mash up",
            "mashup",
            "megamix",
            "mixed by",
            "mixes",
            "my favorite album",
            "my thoughts",
            "outtake",
            "remastered by",
            "review",
            "sped up",
            "vocals only",
            "slower",
            "top 10 list",
            //                  would not be caught the normal way: "My Dire Straits & Mark Knopfler ToP 10 List"
            "tutorial",
            "vid lp",
            "viera vault",
            "vinyl update",
            "vlog",
            //------------------------------------------------------------------------------------------------------------------------------------------
            // NOTE: "Vinyl Confessions" is both 1) a 1982 studio album by Kansas and 2) a homemade "fanzine" video series ("Tim's Vinyl Confessions").
            "tims",
            //------------------------------------------------------------------------------------------------------------------------------------------
            "yvan maarek",
            "brian linehan",
            "discuss",
            "interview",
            "mary ramsey",
            "profile",
            "studio q",
            "teleconference",
            "ken caillat",
            "hall of ghosts",
            "various artists",
            "tribute",
            "allan handelman",
            "beat club",
            "by JMD",
            "full episode",
            "hangout",
            "jack benny",
            "KQED",
            "letterman",
            "mohr stories",
            "music of the sixties",
            "opie and anthony",
            "pilot episode",
            "promo",
            "sirius",
            "the lawrence welk show",
            "clips from",
            "the legendary tales",
            "stars on 45",
            "videopoe",
            "video poe" // wrong medium     -m, -try
        ];
        //--------------------------------------------------------------------------------------------------------
        // NOTE: Three banes of data quality are cover bands, tribute albums and "X plays Y" all of which usually
        // denote homemade videos.  Sometimes, however, they are legitimate albums.  Based on the full sample below,
        // I consider all of them to be acceptable losses:
        // Aretha Franklin      A Tribute to Dinah Washington
        // Chet Atkins          Tribute to Bluegrass
        // George Benson        A Tribute to Nat King Cole
        // Harry Chapin         Harry Chapin Tribute
        // Johnny Cash          A Tribute to Bruce Springsteen's Nebraska
        // Johnny Cash          A Tribute to Hank Williams
        // Ray Price            A Tribute to Willie and Kris
        // Stevie Wonder        Tribute to Uncle Ray
        // Construct and load dynamic edits:
        invalid_video.push("cover " + artist_match_key);
        invalid_video.push("covers " + artist_match_key);
        invalid_video.push("in the style of " + artist_match_key);
        invalid_video.push("opening for " + artist_match_key);
        invalid_video.push("perform " + artist_match_key);
        invalid_video.push("performs " + artist_match_key);
        invalid_video.push("play " + artist_match_key);
        invalid_video.push("to " + artist_match_key);
        invalid_video.push(artist_match_key + " cover");
        invalid_video.push(artist_match_key + " covers");
        invalid_video.push(artist_match_key + " play");
        if (artist_match_key != "hollies") {
            // Eg: Hollies Sing Dylan, Hollies Sing Hollies:
            invalid_video.push("sing " + artist_match_key);
            invalid_video.push(artist_match_key + " sing");
        }
        if (artist_match_key != "hollies") {
            // Eg: In The Hollies Style (what a dumb album name!):
            invalid_video.push(artist_match_key + " style");
        }
        if (!video_match_key.match(new RegExp("guess who plays the guess who", "gi"))) {
            invalid_video.push("plays " + artist_match_key);
            invalid_video.push(artist_match_key + " plays");
        }
        //--------------------------------------------------------------------------------------------------------
        var invalid_video_found = false;
        for (var i = 0; i < invalid_video.length; i++) {
            // JHJHK come back to this at app-consolidation time:  Issues:
            // 1) new
            // 2) "gi" to constant and kill all those "consistent-commments" I use...
            // 3) my security problems
            // 4) error checking and messaging, etc...all are related
            if (video_match_key.match(new RegExp(invalid_video[i], "gi"))) { // worked
                invalid_video_found = true;
                // End the FOR loop now:
                break;
            }
        }
        return invalid_video_found;
    };
    youtube_album.prototype.is_video_invalid_by_artist = function (artist_match_key, video_match_key) {
        var invalid_video_array;
        switch (artist_match_key) {
            // Assign the appropriate array:        
            case "aerosmith":
                invalid_video_array = [
                    "gene greenwood"
                ];
                break;
            case "alabama":
                invalid_video_array = [
                    "alabama shakes",
                    "alabama womens prison",
                    "stars fell on alabama"
                ];
                break;
            case "alanis morissette":
                invalid_video_array = [
                    "full day" // eg: alanis morissette full day part 1 
                ];
                break;
            case "america":
                invalid_video_array = [
                    "united states of america",
                    "spike jones",
                    "RUSTY BRYANT",
                    "God Bless America",
                    "Rogue Records America",
                    "Good Morning America",
                    "America Ma",
                    "middle of america"
                ];
                break;
            case "argent":
                invalid_video_array = [
                    "largent",
                    "argentino",
                    "paul argent" // eg: dj paul argent...
                ];
                break;
            case "bangles":
                invalid_video_array = [
                    "white bangles" // eg: "White Bangles Feroz Khan full songs"
                ];
                break;
            case "barbra streisand":
                invalid_video_array = [
                    "barbra streisand makes" // eg: barbra streisand makes 'partners' of confidence and doubt
                ];
                break;
            case "beatles":
                invalid_video_array = [
                    "beatles on saxophone",
                    "beatles symphony orchestra",
                    "beatles tell all",
                    "the one man beatles",
                    "them beatles",
                    "10 hours"
                ];
                break;
            case "bent":
                invalid_video_array = [
                    "amel bent"
                ];
                break;
            case "boston":
                invalid_video_array = [
                    "boston pops",
                    "THIS IS BOSTON",
                    "Boston Music Hall",
                    "Eagle Boston"
                ];
                break;
            case "chicago":
                invalid_video_array = [
                    "essential pianobar",
                    "klezmer ensemble",
                    "Doobie Brothers",
                    "Neil Young",
                    "sarah vaughan"
                ];
                break;
            case "dire straits":
                invalid_video_array = [
                    "full crime" // eg: full crime episodes  dire straits  brothers in arms...
                ];
                break;
            case "donovan":
                invalid_video_array = [
                    "jason donovan" // eg: singer
                ];
                break;
            case "eagles":
                invalid_video_array = [
                    "byrds to the eagles" // eg: hotel california  la from the byrds to the eagles (2007) 
                ];
                break;
            case "emerson lake palmer":
                invalid_video_array = [
                    "beat club",
                    "case study" // eg: emerson lake & palmer : a case study live from the vaults...
                ];
                break;
            case "fleetwood mac":
                invalid_video_array = [
                    "fleetwood mac full album stevie nicks",
                    "Fleetwood mac classic album rumors" // movie
                ];
                break;
            case "four seasons":
                invalid_video_array = [
                    "vivaldi" // eg: The Best of Classical Music - Vivaldi - The Four Seasons
                ];
                break;
            case "frank sinatra":
                invalid_video_array = [
                    "frank sinatra jr"
                ];
                break;
            case "genesis":
                invalid_video_array = [
                    "genesis of the unaltered evil"
                ];
                break;
            case "heart":
                invalid_video_array = [
                    "atom heart mother",
                    "Christmas In My Heart",
                    "Deep from the Heart",
                    "Golden Heart",
                    "Have Heart",
                    "heart evangelista",
                    "heart throb mob",
                    "heart to heart",
                    "leather heart",
                    "Restless Heart",
                    "Shape of a broken heart",
                    "Songs For The Incurable Heart",
                    "with a thankful heart"
                ];
                break;
            case "journey":
                invalid_video_array = [
                    "a journey through cosmic infinity",
                    "a timeless journey through an emotional dream",
                    "Capas Journey",
                    "Chris Kramer",
                    "Global Journey",
                    "greatest journey",
                    "Journey of Permanence",
                    "Journey Through The Past",
                    "journey to freedom",
                    "journey to infinity",
                    "JOURNEY TO THE UNIVERSE",
                    "Lifes Journey",
                    "rudys journey",
                    "Terrestrial Journey"
                ];
                break;
            case "kansas":
                invalid_video_array = [
                    "Kansas Pacific"
                ];
                break;
            case "keane":
                // note: this is a poorly named video so i'm writing this "filter" to catch only one video.
                // the true title was placed in the description field instead: 'keane's "the making of the
                // album" video, included in perfect symmetry's dvd.'
                invalid_video_array = [
                    "keane perfect symmetry dvd"
                ];
                break;
            case "led zeppelin":
                invalid_video_array = [
                    "acoustic instrumentals",
                    "companion" // eg: led zeppelin iv (companion)
                ];
                break;
            case "linda ronstadt":
                invalid_video_array = [
                    "con mariachi vargas" // linda ronstadt con mariachi vargas...canciones de mi padre...
                ];
                break;
            // lulu 2005         
            case "lulu":
                invalid_video_array = [
                    "allorim",
                    "bang bang lulu",
                    "bot lane",
                    "botlane",
                    "dj lulu",
                    "doigby ",
                    "flesh for lulu",
                    "full game",
                    "gameplay",
                    "honolulu",
                    "hot erotic movie",
                    "league of legends",
                    "lol",
                    "lou reed",
                    "lulu le brief",
                    "lulu support",
                    "lulu german",
                    "lulu blind",
                    "lulu canta",
                    "lulu daizero",
                    "lulu dr sterben",
                    "lulu jam",
                    "lulu kennedy",
                    "lulu mid",
                    "lulu rouge",
                    "lulu santos",
                    "lulu support",
                    "lulu top",
                    "lulu utilidad",
                    "lulu vs nidalee",
                    "lulu ziegler",
                    "lulu zionspartan",
                    "lululemon",
                    "madlife",
                    "metallica",
                    "mischka ",
                    "news for lulu",
                    "nir ben lulu",
                    "where its at",
                    "voyboy" // video game
                ];
                break;
            case "lynyrd skynyrd":
                invalid_video_array = [
                    "lynyrd skynyrd endangered species full album 1994" // eg: movie
                ];
                break;
            case "madonna":
                invalid_video_array = [
                    "nicki minaj",
                    "venus transit" // eg: madonna remix falling free (mdna album) remix / venus transit of the sun mix
                ];
                break;
            case "melanie":
                invalid_video_array = [
                    "melanie c" // a Spice Girl
                ];
                break;
            case "paul simon":
                invalid_video_array = [
                    "classic album graceland",
                    "paul simon hearts and bones album flash 1984"
                ];
                break;
            case "pink floyd":
                // i would have liked to have included this among the "non_album_videos" array elements in
                // is_video_invalid_all_artists().  unfortunately, there are songs that contain this phrase,
                // eg: neil diamond's "the story of my life", taylor swift's "the story of us", etc:
                invalid_video_array = [
                    "the story of" // eg: pink floyd  the story of wish you were here...
                ];
                break;
            case "squeeze":
                invalid_video_array = [
                    "star trek" // eg: star trek legacy lets play part 6 the squeeze
                ];
                break;
            case "sweet":
                invalid_video_array = [
                    "Dark Sweet",
                    "Lying To Be Sweet",
                    "Sweet 75",
                    "Sweet Electra",
                    "Sweet Home",
                    "Sweet James Jones",
                    "Sweet Lizard Illtet",
                    "Sweet Micky",
                    "Sweet Naive",
                    "Sweet Pain",
                    "Sweet Sybil"
                ];
                break;
            case "beach boys":
                invalid_video_array = [
                    "full album instrumental" // eg: the beach boys  'pet sounds' (full album) instrumental...
                ];
                break;
            case "beatles":
                invalid_video_array = [
                    "abbey road symphony",
                    "beatles story",
                    "hear the beatles",
                    "them beatles" // cover band
                ];
                break;
            case "monkees":
                invalid_video_array = [
                    "bob rafelson" // eg: bob rafelson "from the monkees to head"
                ];
                break;
            case "moby":
                invalid_video_array = [
                    "moby dick",
                    "moby grape"
                ];
                break;
            case "renaissance":
                invalid_video_array = [
                    "musique de la renaissance"
                ];
                break;
            case "steely dan":
                invalid_video_array = [
                    "bonus dvd from everything must go"
                ];
                break;
            case "supertramp":
                invalid_video_array = [
                    "my supertramp collection"
                ];
                break;
            case "beach boys":
                invalid_video_array = [
                    "j dilla vs the beach boys  pet sounds in the key of dee"
                ];
                break;
            case "carpenters":
                invalid_video_array = [
                    "john carpenter"
                ];
                break;
            case "hollies":
                invalid_video_array = [
                    "the bloody hollies"
                ];
                break;
            case "sonny cher":
                invalid_video_array = [
                    "good times"
                ];
                break;
            case "squeeze":
                invalid_video_array = [
                    "squeeze play"
                ];
                break;
            case "starship":
                invalid_video_array = [
                    "starship amazing"
                ];
                break;
            case "police":
                invalid_video_array = [
                    "rap francais",
                    "police terror"
                ];
                break;
            case "travis":
                invalid_video_array = [
                    "randy travis",
                    "travis scott",
                    "travis tritt",
                    "chris travis",
                    "travis bretzer",
                    "travis porter",
                    "travis wammack"
                ];
                break;
            case "the tubes":
                invalid_video_array = [
                    "ish tubes"
                ];
                break;
            case "yes":
                invalid_video_array = [
                    "yes sir"
                ];
                break;
            default:
                invalid_video_array = [];
        }
        var return_value = false; // init
        if (invalid_video_array) {
            for (var i = 0; i < invalid_video_array.length; i++) {
                if (video_match_key.match(new RegExp("\\b" + invalid_video_array[i] + "\\b", "gi"))) { // global, case-insensitive,  whole word/not substring
                    return_value = true;
                    break;
                }
            }
        }
        return return_value;
    };
    youtube_album.prototype.optimize_album_array_for_search = function (artist_match_key, albums) {
        // Optimize the discography array to handle partial matches, especially on short
        // album titles, and eponymous albums:
        // Since long titles are bad for matching and since a YouTube user is liable to enter either a
        // title or a subtitle, we will accept either and will alter the album array to accomplish this.
        //--------------------------------------------------------------
        // Eg: 10,000 Maniacs, Compilation albums:
        // BEFORE:
        // Campfire Songs: The Popular, Obscure and Unknown Recordings
        // Hope Chest: The Fredonia Recordings 1982-1983
        // AFTER:
        // Campfire Songs
        // Hope Chest
        // The Fredonia Recordings 1982-1983
        // The Popular, Obscure and Unknown Recordings
        //--------------------------------------------------------------
        var colon_index;
        var album_title, album_subtitle;
        var album_title_match_key, album_subtitle_match_key;
        var subtitle_array = [];
        for (var i = 0; i < albums.length; i++) {
            // NOTE: The presence of a colon usually denotes a "Title: Subtitle" format.
            // Eg: Joe Strummer: The Future is Unwritten
            // Eg: Anthology: Marvin Gaye
            colon_index = albums[i].indexOf(":");
            if (colon_index > -1) {
                // Get and cleanup the title and subtitle:
                album_title = get_substring(albums[i], 0, colon_index - 1);
                album_subtitle = albums[i].substring(colon_index + 1);
                album_title = consolidate_extraneous_spaces(album_title);
                album_subtitle = consolidate_extraneous_spaces(album_subtitle);
                // Since our goal is to "liberate" the title and subtitle as individual entries, we don't want
                // to create an eponymous album where none existed.  Let's examine eponymousness:
                album_title_match_key = this.runtime_musical_artist_services.get_title_match_key(album_title, artist_match_key);
                album_subtitle_match_key = this.runtime_musical_artist_services.get_title_match_key(album_subtitle, artist_match_key);
                var title_is_eponymous = false; // init
                var subtitle_is_eponymous = false; // init
                if (album_title_match_key == artist_match_key) {
                    title_is_eponymous = true;
                }
                if (album_subtitle_match_key == artist_match_key) {
                    subtitle_is_eponymous = true;
                }
                // Now, taking eponymousness into consideration, reload the album array entry/entries to liberate
                // the title and/or the subtitle:
                if (title_is_eponymous == false && subtitle_is_eponymous == false) {
                    // Reset the original entry as the title:
                    albums[i] = album_title;
                    // Create a new entry for the subtitle:
                    subtitle_array.push(album_subtitle);
                }
                else {
                    if (title_is_eponymous == false && subtitle_is_eponymous == true) {
                        // Reset the original entry as the title:
                        albums[i] = album_title;
                    }
                    else {
                        if (title_is_eponymous == true && subtitle_is_eponymous == false) {
                            // Reset the original entry as the subtitle:
                            albums[i] = album_subtitle;
                        }
                    }
                }
            }
        }
        // Combine the title array and the subtitle array:
        albums = albums.concat(subtitle_array);
        //-----------------------------------------------------------------------------------------------
        // NOTE: This solves many problems concerning partial matches, some examples of which follow.  
        // Artist             Prior Album     Subsequent Album
        // ------             -----------     ----------------
        // Barbra Streisand   Guilty          Guilty Pleasures
        // Blondie		      Blondie         Blondie Ever
        // Bob Seger 	      Greatest Hits   Greatest Hits 2
        // Chicago 		      Chicago II      Chicago III
        // Eric Clapton	      Eric Clapton    Clapton
        // NOTE 2: Partial matches are most problematic for short album titles, some examples of which follow:  
        // Artist           Album
        // ------           -----
        // Elliott Smith     XO
        // Henry Mancini     10
        // INXS              X
        // Jethro Tull       A
        // Kate Havnevik     &i
        // Steve Winwood     Go
        // NOTE 3: Diana Ross's discography is such a muddle that I would be surprised if my processing
        // handles it properly.  Nobody's perfect:
        // 1970 Diana Ross
        // 1976 Diana Ross
        // 1978 Ross
        // 1980 Diana
        // 1983 Ross
        //-----------------------------------------------------------------------------------------------
        // The goal of this process is to sort the discography album array by the lengths of the respective elements, 
        // longest first, shortest last.  This will (very cleverly) remove the possibiliy of partial matches
        // Sample Output, Elliott Smith, Studio Albums:
        // From a Basement on the Hill
        // Roman Candle
        // Either/Or
        // New Moon
        // Figure 8
        // XO
        // NOTE: This presently removes eponymous albums (as found the new way):
        var length_plus_album_title_array = [];
        var return_album_array = [];
        for (var i = 0; i < albums.length; i++) {
            // NOTE: Currently this handles only Jethro Tulls "A" (1980) album which wreaks havoc in the form of false positives since
            // it is both a common vowel, as a letter, and a common article, as a word.  YouTube has a video under the name "A Album":
            if (albums[i].length == 1) {
                albums[i] = albums[i] + " album";
            }
            var album_match_key = this.runtime_musical_artist_services.get_title_match_key(albums[i], artist_match_key);
            // If the album is not eponymous:
            if (album_match_key != artist_match_key) {
                if (this.debug_trace_eponymous == true) {
                    this.write_debug(artist_match_key);
                    this.write_debug(album_match_key);
                    this.write_debug("NOT EPONYMOUS");
                }
                // Create a composite work string consisting of the string lengths of the album titles
                // and the album titles themselves and load it into the output array:
                length_plus_album_title_array.push(
                // Pad the high order digits of the string lengths of the album titles with zeros.
                // This will have the beneficial effect of aligning the lengths for sorting.
                // Eg: zero_pad(123, 4) returns "0123" as a string
                zero_pad(albums[i].length, // number
                4 // digits
                ) + albums[i]);
            }
            else {
                if (this.debug_trace_eponymous == true) {
                    this.write_debug(artist_match_key);
                    this.write_debug(album_match_key);
                    this.write_debug("IS EPONYMOUS");
                }
            }
            if (this.debug_trace_eponymous == true) {
                this.write_debug("----------------");
            }
        }
        // Sort by album title length in ascending order and then reverse it to descending order:
        length_plus_album_title_array.sort();
        length_plus_album_title_array.reverse();
        // With the sort complete, we can now strip off the string lengths, resulting in an array
        // sorted in descending order by album title lengths:
        for (var j = 0; j < length_plus_album_title_array.length; j++) {
            return_album_array[j] = length_plus_album_title_array[j].substr(4);
        }
        return return_album_array;
    };
    youtube_album.prototype.write_album = function (video_id, title, description, image, duration) {
        this.album_count++; // increment
        // Append the album to the report:                            
        this.albums_HTML_string +=
            "<img id='thumbnail' alt='' src='" +
                image +
                "'/>" +
                "<br />" +
                format_seconds_as_time(duration) +
                "<br />" +
                "<br />" +
                "<a href='" +
                YOUTUBE_VIDEO_PREFIX +
                video_id + // "id" is a YouTube video ID, eg: "iwVDwO2N644"
                "'>" + title + "</a>" +
                "<br />" +
                "<textarea id='description' class='AlbumTextArea' rows='1' cols='1'" + ">" +
                description +
                "</textarea>" +
                "<br />" +
                "<br />";
    };
    youtube_album.prototype.write_debug = function (string_to_write) {
        // Since we will be modifying the argument, let's make a copy and work with that:
        var string_to_write_edited = string_to_write;
        if (this.artist != "") {
            string_to_write_edited = "ARTIST=" + this.artist + ": " + string_to_write_edited;
        }
        standard_streams_services.write("debug", string_to_write_edited);
    };
    youtube_album.prototype.write_hardcoded_albums = function (title, description, video_ids) {
        // Using "brute force", just write these values to the page:
        // Basically, make sure that I don't miss any known instances of The Beatles White Album:
        var YOUTUBE_IMAGE_SUFFIX = "/default.jpg";
        for (var i = 0; i < video_ids.length; i++) {
            this.write_album(video_ids[i], title, description, YOUTUBE_IMAGE_PREFIX +
                video_ids[i] +
                YOUTUBE_IMAGE_SUFFIX, // image
            5615 // duration - 1:33:35 (The White Album from Wikipedia)
            );
        }
    };
    youtube_album.prototype.write_hardcoded_studio_albums_by_artist = function (artist_match_key) {
        // NOTE: This is an extremely kludgy solution to a very vexing problem.  The Beatles ninth studio album
        // was eponymously named (The Beatles, 1968).  It has gone down in history with a more well-known "alias",
        // "The White Album".
        // All my programmatic YouTube querying is preceeded by personal attempts, using online YouTube, to determine
        // what my results are vs. what they should be, etc.  Try as I might, I could not manually construct a single
        // query to find all instances of both the eponymously named "The Beatles" as well as ones partially or solely
        // called "The White Album".  This album was unique in that YouTube did not, it seems, tie the two names
        // together, and if YouTube won't then I can't programtically.  
        // The problem is further compounded by the fact that my eponymous search logic is probably the weakest portion
        // of the whole program (unfortunately and unavoidably).
        // The issue is compounded again by the fact that this is far and away my favorite Beatles album and I don't
        // want to miss any instances of it if I can possibly avoid it.  So here, I hardcode the ones I manually
        // found through trial and error:
        if (artist_match_key == "beatles") {
            var video_ids = [
                "1dQB-pdfso8",
                "VuoFsoJlZcs",
                "BjQrMqjd2vE",
                "xeHVN6wdidw" // up as of 6-22-2015
            ];
            // 
            // Using "brute force" just write these values to the page.  Basically, make sure that
            // I don't miss any known instances of The Beatles White Album:
            this.write_hardcoded_albums("The Beatles - The Beatles (The White Album)", // title
            "hardcoded search result", // description
            video_ids);
        }
    };
    return youtube_album;
}());
//# sourceMappingURL=YoutubeAlbum.js.map