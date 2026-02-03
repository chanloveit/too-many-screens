export function convertToEmbedUrl(url: string): string{
	try{
		const urlObj = new URL(url);

		if(urlObj.hostname.includes('youtube.com')){
			const videoId = urlObj.searchParams.get('v');
			if(videoId){
				return `https://www.youtube.com/embed/${videoId}`;
			}
		}

		if(urlObj.hostname.includes('youtu.be')){
			const videoId = urlObj.pathname.slice(1);
			return `https://www.youtube.com/embed/${videoId}`;
		}

		if(urlObj.pathname.includes('/embed/')){
			return url;
		}
		

		return url;
	}

	catch{
		return url;
	}
}