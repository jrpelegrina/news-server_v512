const createCard = require('./lib/create-card');

module.exports = createCard({
    name: 'video',
    type: 'dom',
    render(opts) {
        let payload = opts.payload;
        // let version = opts.options.version;
        let dom = opts.env.dom;

        if (!payload.src) {
            return '';
        }

       // let video = dom.createElement('video');
        let figure = dom.createElement('figure');
        figure.setAttribute('class', 'kg-card kg-embed-card');
 //       if (payload.cardWidth) {
   //         figureClass = `${figureClass} kg-width-${payload.cardWidth}`;
    //    }
     //   figure.setAttribute('class', figureClass);

       let video = dom.createElement('video');
        video.setAttribute('src', payload.src);
        //video.setAttribute('class', 'kg-image');
        //if (payload.alt) {
         //   img.setAttribute('alt', payload.alt);
       // }
        //if (payload.title) {
         //   img.setAttribute('title', payload.title);
       // }
	video.setAttribute("width", "100%");
	video.setAttribute("height", "100%");
	video.setAttribute("controls", "controls");

        figure.appendChild(video);

        if (payload.caption) {
            let figcaption = dom.createElement('figcaption');
            figcaption.appendChild(dom.createRawHTMLSection(payload.caption));
            video.appendChild(figcaption);
            video.setAttribute('class', `${figure.getAttribute('class')} kg-card-hascaption`);
        }

        return video;
    },

    absoluteToRelative(urlUtils, payload, options) {
        payload.src = payload.src && urlUtils.absoluteToRelative(payload.src, options);
        payload.caption = payload.caption && urlUtils.htmlAbsoluteToRelative(payload.caption, options);
        return payload;
    },

    relativeToAbsolute(urlUtils, payload, options) {
        payload.src = payload.src && urlUtils.relativeToAbsolute(payload.src, options);
        payload.caption = payload.caption && urlUtils.htmlRelativeToAbsolute(payload.caption, options);
        return payload;
    }
});
