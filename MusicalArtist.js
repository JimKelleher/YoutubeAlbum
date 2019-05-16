// This file contains musical artist name services
// NOTE: The following high level functions are shown in hierarchical, usage order:
// My homemade musical artist name object:
var musical_artist = /** @class */ (function () {
    // My homemade musical artist name object Part A, the constructor:
    function musical_artist() {
    }
    // My homemade musical artist name object Part B, utility functions:
    musical_artist.prototype.convert_common_abbreviations = function (look_in) {
        // Since we will be modifying the argument, let's make a copy and work with that:
        var look_in_edited = look_in;
        look_in_edited = look_in_edited.replace(new RegExp("\\b" + "bros" + "\\b", "gi"), "brothers");
        look_in_edited = look_in_edited.replace(new RegExp("\\b" + "bto" + "\\b", "gi"), "bachman turner overdrive");
        look_in_edited = look_in_edited.replace(new RegExp("\\b" + "csny" + "\\b", "gi"), "crosby stills nash");
        look_in_edited = look_in_edited.replace(new RegExp("\\b" + "csn" + "\\b", "gi"), "crosby stills nash");
        look_in_edited = look_in_edited.replace(new RegExp("\\b" + "elo" + "\\b", "gi"), "electric light orchestra");
        // Return the modified copy of the argument:
        return look_in_edited;
    };
    musical_artist.prototype.does_video_artist_require_quotes = function (artist_match_key) {
        var return_value = false; // init
        // NOTE: This is a bizarre quirks of the YouTube query engine...Somewhere on the back end
        // YouTube "loses" one of the "the"s in "The The" I surmise based on looking at the results.
        // Querying for videos containing the word "the" is distinctly unproductive!
        if (artist_match_key == "the the" ||
            artist_match_key == "the tubes") {
            return_value = true;
        }
        return return_value;
    };
    musical_artist.prototype.fix_artist_misspellings = function (look_in) {
        // Since we will be modifying the argument, let's make a copy and work with that:
        var look_in_edited = look_in;
        // NOTE: The user-centric nature of YouTube, set against the backdrop of a country that spells badly, combined with
        // some artists whose names are, I say frankly, difficult to spell (ie, even I have trouble with them!) makes me do
        // this reluctantly, but I do it.  Matching to the artist, no matter how it is done, is crucial to not missing some
        // easily gained albums.  It is a form of artificial intelligence and we employ it sparingly:
        // Do global, case-insensitive matching:
        // This avoids substring matching by a careful order of execution.  NOTE: This is every way you could possibly misspell it!
        look_in_edited = look_in_edited.replace(new RegExp("Eliott Smith", "gi"), "Elliott Smith");
        look_in_edited = look_in_edited.replace(new RegExp("Elliot Smith", "gi"), "Elliott Smith");
        look_in_edited = look_in_edited.replace(new RegExp("Eliot Smith", "gi"), "Elliott Smith");
        // Wikipedia name   Match key   Acceptable alternative
        // --------------   ---------   ----------------------
        // The B-52's       b 52s       b52s            
        // The Go-Go's      go gos      gogos           
        // UB40             ub40        ub 40                       
        look_in_edited = look_in_edited.replace(new RegExp("Allmand", "gi"), "Allman");
        look_in_edited = look_in_edited.replace(new RegExp("Almand", "gi"), "Allman");
        look_in_edited = look_in_edited.replace(new RegExp("b52s ", "gi"), "b 52s");
        look_in_edited = look_in_edited.replace(new RegExp("Backman Turner", "gi"), "Bachman Turner");
        look_in_edited = look_in_edited.replace(new RegExp("Barbara Streisand", "gi"), "Barbra Streisand");
        look_in_edited = look_in_edited.replace(new RegExp("Carol King", "gi"), "Carole King");
        look_in_edited = look_in_edited.replace(new RegExp("David Gilmore", "gi"), "David Gilmour");
        look_in_edited = look_in_edited.replace(new RegExp("Garfunkle", "gi"), "Garfunkel");
        look_in_edited = look_in_edited.replace(new RegExp("Graham Parker Rumours", "gi"), "Graham Parker Rumour");
        look_in_edited = look_in_edited.replace(new RegExp("gogos ", "gi"), "go gos");
        look_in_edited = look_in_edited.replace(new RegExp("Jacob Dylan", "gi"), "Jakob Dylan");
        look_in_edited = look_in_edited.replace(new RegExp("Jimmy Buffet\\b", "gi"), "Jimmy Buffett"); // whole word/not substring
        look_in_edited = look_in_edited.replace(new RegExp("Meatloaf", "gi"), "Meat Loaf");
        look_in_edited = look_in_edited.replace(new RegExp("Nickel back", "gi"), "Nickelback");
        look_in_edited = look_in_edited.replace(new RegExp("ub 40", "gi"), "ub40");
        // Return the modified copy of the argument:
        return look_in_edited;
    };
    musical_artist.prototype.get_artist_match_key = function (artist_cored) {
        // Since we will be modifying the argument, let's make a copy and work with that:
        var artist_match_key = artist_cored;
        // All match key generation has to start with this step:
        artist_match_key = this.get_reduced_character_set(artist_match_key);
        // Handle "super group" configurations (Crosby, Stills, Nash & Young) and "one name singers" (Melanie, Sia):
        artist_match_key = this.regularize_artists(artist_match_key, artist_match_key);
        // Return the modified copy of the argument:
        return artist_match_key;
    };
    musical_artist.prototype.get_artist_name_core = function (artist) {
        // Since we will be modifying the argument, let's make a copy and work with that:
        var artist_edited = artist;
        //---------------------------------------------------------------------------------------------------------------------------
        // Full Name                        Core Name
        // ---------                        ---------
        // The Beatles                      Beatles
        // Steve Miller Band                Steve Miller
        // The Allman Brothers Band         Allman Brothers
        // The Mamas & the Papas            Mamas & the Papas *
        // * NOTE: We can't eliminate internal THEs and BANDs because we will eventually be doing character-based matching on these
        // artist names and that would cause them to fail (or cause me to have to start altering my YouTube queries to the same extent).
        // With all the song title hard-coding taking place, this would be a disaster. I already get thousands of albums (more than I
        // could ever listen to!) without resorting to such tactics.
        // Interestingly, I did some sample querying and found that YouTube agrees with me!  Searching for "Mamas & Papas" actually
        // hurt my results.
        if (this.is_artist_a_common_word(artist_edited) == false) {
            // NOTE: Replace, with no substitute, equals deletion:
            artist_edited = artist_edited.replace(new RegExp("^The ", "gi"), ""); // leading 
            artist_edited = artist_edited.replace(new RegExp(" Band$", "gi"), ""); // trailing
        }
        // Return the modified copy of the argument:
        return artist_edited;
    };
    musical_artist.prototype.get_reduced_character_set = function (artist_or_album_or_video) {
        // This function harmonizes a Wikipedia artist name or the titles of a Wikipedia album or a Youtube video so
        // they can be compared to one another.  Any one can be passed as an argument to this function:
        var artist_or_album_or_video_edited = artist_or_album_or_video;
        //---------------------------------------------------------------------------------------------------------------------------
        // Turn ampersands and plus signs into " and "...
        artist_or_album_or_video_edited = regularize_AND_separators(artist_or_album_or_video_edited); // Egs: Loggins and Messina, Simon & Garfunkel   DEPENDENCY A
        //...and then remove them:
        artist_or_album_or_video_edited = artist_or_album_or_video_edited.replace(new RegExp(" and ", "gi"), " ");
        // ------------------------------------------------------------------------------------------------------
        // CONVERSIONS:
        // NOTE: I could have 1) Written a routine that replaces all such Unicode characters since I have a service,
        // unicode_ASCII(), that could be adapted.  However, this is to handle keyboard entry and pasting and if it
        // were a bigger problem I'd address it.  It isn't.  2) I would then suffer a performance degradation by making
        // character-by-character checks in that manner.  Here we will just handle the known problems in the proprietary
        // "JimRadioArtist" databases.  Also, bear in mind that the requirement is placed on us in the first place by our
        // "reference" datasource, Wikipedia:
        //-------------------------------------------------------------------------------------------------------
        // 3-18-2019:
        // Bachman–Turner_Overdrive vs. Bachman-Turner_Overdrive (different dash chars), The B-52's, The Go-Go's
        artist_or_album_or_video_edited = regularize_dashes(artist_or_album_or_video_edited);
        artist_or_album_or_video_edited = replace_all(artist_or_album_or_video_edited, "-", " ");
        //-------------------------------------------------------------------------------------------------------
        // Lynyrd Skynyrd (Pronounced 'Lĕh 'nérd 'Skin 'nérd)
        artist_or_album_or_video_edited = artist_or_album_or_video_edited.replace(new RegExp("ĕ", "gi"), "e");
        // Lynyrd Skynyrd (Pronounced 'Lĕh 'nérd 'Skin 'nérd), Sinéad O'Connor, José González
        artist_or_album_or_video_edited = artist_or_album_or_video_edited.replace(new RegExp("é", "gi"), "e");
        // Zoë Johnston
        artist_or_album_or_video_edited = artist_or_album_or_video_edited.replace(new RegExp("ë", "gi"), "e");
        // José González
        artist_or_album_or_video_edited = artist_or_album_or_video_edited.replace(new RegExp("á", "gi"), "a");
        // George Harrison - "Thirty Three & 1/ॐ"
        artist_or_album_or_video_edited = artist_or_album_or_video_edited.replace(new RegExp("ॐ", "gi"), "3");
        // Convert to lower case:
        artist_or_album_or_video_edited = artist_or_album_or_video_edited.toLowerCase();
        // ------------------------------------------------------------------------------------------------------
        // WINNOWING:
        // Edit down (omitting exceptions) to only lower case letters, numbers and spaces:
        artist_or_album_or_video_edited = strip_string_to_regexp(artist_or_album_or_video_edited, "[a-z0-9\\s]");
        // ------------------------------------------------------------------------------------------------------
        // TIDYING:
        // In the above edits, I am careless about extra spaces because I'm cleaning them here:
        artist_or_album_or_video_edited = consolidate_extraneous_spaces(artist_or_album_or_video_edited);
        // ------------------------------------------------------------------------------------------------------
        return artist_or_album_or_video_edited;
    };
    musical_artist.prototype.get_title_core = function (title_match_key, artist_match_key) {
        // Since we will be modifying the argument, let's make a copy and work with that:
        var title_match_key_edited = title_match_key;
        // "Core" all of the artist names in the title.  Matching must be done on cored artist names so as to maximize the query results:
        title_match_key_edited = title_match_key_edited.replace(new RegExp("the " + artist_match_key + " band", "gi"), artist_match_key);
        title_match_key_edited = title_match_key_edited.replace(new RegExp("the " + artist_match_key, "gi"), artist_match_key);
        title_match_key_edited = title_match_key_edited.replace(new RegExp(artist_match_key + " band", "gi"), artist_match_key);
        // Return the modified copy of the argument:
        return title_match_key_edited;
    };
    musical_artist.prototype.get_title_match_key = function (album_or_video, artist_match_key) {
        // This function harmonizes the titles of a Wikipedia album and a Youtube video so they can be compared to one another.
        // Since we will be modifying the argument, let's make a copy and work with that:
        var title_match_key_edited = album_or_video;
        // All match key generation has to start with this step:
        title_match_key_edited = this.get_reduced_character_set(title_match_key_edited);
        // "Core" all of the artist names in the title.  Matching must be done on cored artist names so as to maximize the query results:
        title_match_key_edited = this.get_title_core(title_match_key_edited, artist_match_key);
        // Handle "super group" configurations, "one name singers", singers who went by multiple names at different points of their careers,
        // British vs. American spelling and the undesired presence of first names:
        title_match_key_edited = this.regularize_artists(title_match_key_edited, artist_match_key);
        // This will squeeze more productivity out of our queries:
        title_match_key_edited = this.fix_artist_misspellings(title_match_key_edited);
        // This will squeeze more productivity out of our queries:
        title_match_key_edited = this.convert_common_abbreviations(title_match_key_edited);
        // Return the modified copy of the argument:
        return title_match_key_edited;
    };
    musical_artist.prototype.is_artist_a_common_word = function (wikipedia_artist) {
        // NOTE: This is used by two separate objects to perform two separate functions.  It drives: 
        // 1) Musical Artist Service's task of generating an artist core name "in get_artist_name_core()"
        // 2) YouTube Album Service's task of looking for eponymous albums in "is_video_of_eponymous_album()"
        var common_word_artist = [
            "America",
            "Beatles",
            "Boston",
            "Bread",
            "Chicago",
            "Doors",
            "Eagles",
            "Genesis",
            "Heart",
            "Journey",
            "Kansas",
            "Manfred Mann's Earth Band",
            "Renaissance",
            "Sweet",
            "The Association",
            "The Band",
            "The Beat (British band)",
            "The Beat",
            "The Cars",
            "The Clash",
            "The Cult",
            "The Firm",
            "The Guess Who",
            "The Motels",
            "The The",
            "The Tubes",
            "The Who",
            "The Zombies",
            "Toto",
            "Yes"
        ];
        var return_value = false; // init
        for (var i = 0; i < common_word_artist.length; i++) {
            if (common_word_artist[i].match(new RegExp("\\b" + wikipedia_artist + "\\b", "gi"))) { // global, case-insensitive,  whole word/not substring
                return_value = true;
                break;
            }
        }
        return return_value;
    };
    musical_artist.prototype.is_artist_a_place_name = function (artist_match_key) {
        // NOTE: The full list is exhaustive, but all I care about are these, the ones that are found in the
        // JimRadioArtistWikipediaNaming1 and JimRadioArtistWikipediaNaming2 databases.  Use these for testing:
        /*
        Alabama
        America
        Boston
        Chicago
        Kansas
        */
        var place_name = [
            "Aberdeen",
            "Alabama",
            "Alaska",
            "America",
            "Barcelona",
            "Bayside",
            "Beirut",
            "Berlin",
            "Boston",
            "Cairo",
            "Calexico",
            "Chelsea",
            "Chicago",
            "Chilliwack",
            "Cruachan",
            "Danzig",
            "Defiance, Ohio",
            "Delaware",
            "Dover",
            "Egypt",
            "Geneva",
            "Halifax",
            "Halloween, Alaska",
            "Hedley",
            "Hiroshima",
            "Hollenthon",
            "Houston",
            "Idaho",
            "Japan",
            "Jerusalem",
            "Kansas",
            "Kashmir",
            "Laibach",
            "London",
            "Manassas",
            "Mandalay",
            "Memphis",
            "Minsk",
            "Missouri",
            "Monaco",
            "Mount Shasta",
            "Nantucket",
            "New England",
            "Oregon",
            "Orleans",
            "Phoenix",
            "Portishead",
            "Texas",
            "Toronto"
        ];
        var return_value = false; // init
        for (var i = 0; i < place_name.length; i++) {
            if (place_name[i].match(new RegExp("\\b" + artist_match_key + "\\b", "gi"))) { // global, case-insensitive,  whole word/not substring
                return_value = true;
                break;
            }
        }
        return return_value;
    };
    musical_artist.prototype.regularize_artists = function (artist_or_title_match_key, artist_match_key) {
        // Since we will be modifying the argument, let's make a copy and work with that:
        var match_key = artist_or_title_match_key;
        // NOTE: I could have used the artist match key argument as the driver of a switch statement, as is done in Youtube album services'
        // "is_video_invalid_by_artist()" function.  Rather than over-complicate all of these edits in that way, I'll just do straight
        // replaces which will have no effect where they are not needed.  In effect, the replace is doing the checking for me.
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------
        // NEEDED BY ARTIST AND TITLE PROCESSING:
        // Handle "super group" configurations and "one name singers":
        match_key = match_key.replace(new RegExp("melanie safka", "g"), "melanie");
        match_key = match_key.replace(new RegExp("sia furler", "g"), "sia");
        // NOTE: On Wikipedia, CSN maps directly to CSNY (their discographies are thus merged). That is why the JimRadio Artist name is CSNY.
        // This fact accomplishes half of our task. Attempting to match YouTube on CSNY will unnecessarily limit our results.  By dropping the
        // Y from CSNY (though still carrying the albums in the discography), we will accomplish both full (CSN) and partial (CSNY) video title
        // matches (very cleverly, I must say).  We have effectively "exploded" one band (CSNY) into two (CSNY and CSN).
        match_key = match_key.replace(new RegExp("crosby stills nash young", "g"), "crosby stills nash"); // DEPENDENCY A
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------
        // NEEDED BY TITLE PROCESSING (most/all are for video titles in particular):
        // Handle singers who went by multiple names at different points of their careers, British vs. American spelling and the undesired
        // presence of first names:
        // NOTE: I could have done this algorithmically but that would have been time-consuming gold-plating:
        match_key = match_key.replace(new RegExp("daryl hall john oates", "g"), "hall oates");
        match_key = match_key.replace(new RegExp("jim seals dash crofts", "g"), "seals crofts");
        match_key = match_key.replace(new RegExp("keith emerson greg lake carl palmer", "g"), "emerson lake palmer");
        match_key = match_key.replace(new RegExp("kenny loggins jim messina", "g"), "loggins messina");
        match_key = match_key.replace(new RegExp("paul simon art garfunkel", "g"), "simon garfunkel");
        match_key = match_key.replace(new RegExp("stevie winwood", "g"), "steve winwood");
        // NOTE: This is not a misspelling, it is a different dictionary (since the band contained both American and British artists):
        match_key = match_key.replace(new RegExp("travelling wilburys", "g"), "traveling wilburys");
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Return the modified copy of the argument:
        return match_key;
    };
    return musical_artist;
}());
//# sourceMappingURL=MusicalArtist.js.map