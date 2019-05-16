
NOTE:  File "YoutubeAlbum.js" has the following:

	this.YOUTUBE_GDATA_DEVELOPER_KEY = "API_KEY";
 
youtube_album.step_A_get_youtube_videos_first_page = function () {

    var url_to_get = this.YOUTUBE_GDATA_QUERY_SEARCH_PREFIX + ...

	o
	o
	o

-----------------------

It is unfortunate that this private key is viewable in the client-side JS code.  I would have to re-architect the entire
YouTube lookup process to hide this value on the server.  Thus, I will live with this unfortunate situation.
