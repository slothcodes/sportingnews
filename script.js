// TODO
// [X] GET ALL DATA FROM EACH STORY (URL,PICTURE,DATE,LINK,TITLE,DESCR)
// [X] CREATE OBJECTS FROM THE DATA
// [X] CREATE AND DISPLAY THE STORIES FROM THE OBJ LIST
// [X] FIND MORE SPORTS NEWS SOURCES 
// [X] SORT THE ARRAY OF OBJECTS ACCORDING TO DATE
// [X] ADD HYPERLINK TO TITLE
// [X] ADD IMAGE TO BLOCK WHEN AVAILABLE
// [X ] ADD BUTTON CONTROLS TO SELECT TOPICS
// [ ] FORMAT BUTTONS AND FIX THEIR POSITION WHEN SCROLLING
// testing testing testing

const nflFeeds = ['https://www.rotowire.com/rss/news.php?sport=NFL','https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=nfl','https://www.espn.com/espn/rss/nfl/news','https://www.cbssports.com/rss/headlines/nfl']
const nbaFeeds = ['https://www.rotowire.com/rss/news.php?sport=NBA','https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=nba','https://www.espn.com/espn/rss/nba/news','https://www.cbssports.com/rss/headlines/nba']
const mlbFeeds = ['https://www.rotowire.com/rss/news.php?sport=MLB','https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=mlb','https://www.espn.com/espn/rss/mlb/news','https://www.cbssports.com/rss/headlines/mlb']
const mmaFeeds = ['https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=ufc','https://www.cbssports.com/rss/headlines/mma']
const golfFeeds = ['https://www.rotowire.com/rss/news.php?sport=GOLF','https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=golf','https://www.cbssports.com/rss/headlines/golf']
const boxingFeeds = ['https://www.cbssports.com/rss/headlines/boxing']
const ncaafFeeds = ['https://www.rotowire.com/rss/news.php?sport=CFB','https://api.foxsports.com/v1/rss?partnerKey=zBaFxRyGKCfxBagJG9b8pqLyndmvo7UU&tag=cfb','https://www.espn.com/espn/rss/ncf/news','https://www.cbssports.com/rss/headlines/college-football']

//const nflFeeds = ['https://www.espn.com/espn/rss/nfl/news','https://www.cbssports.com/rss/headlines/nfl'];
//const nbaFeeds = ['https://www.espn.com/espn/rss/nba/news','https://www.cbssports.com/rss/headlines/nba'];
const allFeeds = [nflFeeds,nbaFeeds,mlbFeeds,mmaFeeds,golfFeeds,boxingFeeds,ncaafFeeds];
//let stories = [];
bootList = boot();
//console.log(bootList);

async function boot(){
    const unsortedStoryList = await initialLoad();
    const sortedStoryList = sortStoriesDate(unsortedStoryList) 
    addStories(sortedStoryList);
    //return s;
}

function addStories(storyList){
    // ADDS STORIES TO THE DOM
    // CREATE BLOCK ADD ELEMENTS TO BLOCK THEN ADD BLOCK TO PAGE

    // CREATE STORY BLOCK
    storyList.forEach(storyOBJ =>{
        // articleBlock = main container for an individual story
        const articleBlock = document.createElement('div');
        articleBlock.setAttribute('class','storyElement');
        const articleTextBlock = document.createElement('div');
        articleTextBlock.setAttribute('class','storyElementTextBlock')
        // titleSpan creates element for the title for customization
        const titleAnchor = document.createElement('a');
        const titleText = document.createTextNode(storyOBJ.title);
        // add titleText to titleSpan then add titleSpan to articleBlock
        titleAnchor.appendChild(titleText);
        titleAnchor.title = storyOBJ.title;
        titleAnchor.href = storyOBJ.storyURL;
        articleTextBlock.appendChild(titleAnchor);

        const descrSpan = document.createElement('span');
        const descrText = document.createTextNode(storyOBJ.description);
        descrSpan.appendChild(descrText);
        articleTextBlock.appendChild(descrSpan);
        // const linkSpan = document.createElement('span');
        // const storyLink = document.createTextNode(storyOBJ.storyURL);
        // linkSpan.appendChild(storyLink);
        // articleBlock.appendChild(linkSpan);
        const pubDateSpan = document.createElement('span');
        const pubDateText = document.createTextNode(storyOBJ.pubDate);
        pubDateSpan.appendChild(pubDateText);
        articleTextBlock.appendChild(pubDateSpan);

        // ADD ARTICLETEXTBLOCK TO ARTICLE BLOCK
        articleBlock.appendChild(articleTextBlock);

        //ADD IMAGE TO POST
        if(storyOBJ.image != 'none'){
            const imageSpan = document.createElement('img');
            //const imageURL = document.createTextNode(storyOBJ.image);
            imageSpan.src = storyOBJ.image;
            //imageSpan.appendChild(imageURL);
            articleBlock.appendChild(imageSpan);
        }

        // ADD STORY BLOCK TO THE DOM
        const domElement = document.getElementById('storyList');
        domElement.appendChild(articleBlock);
    })


    // storyList.forEach(element => {
    //     const para = document.createElement('p');
    //     const node = document.createTextNode(element);
    //     para.appendChild(node);
    //     const domElement = document.getElementById('container');
    //     domElement.appendChild(para);
    // });
    //let sBlock = document.createElement('span');
}

async function initialLoad(){
    // GET ALL STORIES FROM ALL LIST
    let allStories = [];
    for(i=0;i<allFeeds.length;i++){
        for(x=0;x<allFeeds[i].length;x++){
            const sults = await fetch(allFeeds[i][x]);
            const tex = await sults.text();
            let parser = new DOMParser();
            let xml = parser.parseFromString(tex,'text/xml');
            console.log(xml);
            let itemList = xml.getElementsByTagName('item');
            for(y=0;y<itemList.length;y++){
                title = formatStories(itemList[y]);
                allStories.push(title);
            }
            //console.log(xml);
            //console.log(title);
        }
    }
    console.log(allStories);
    return allStories;
}

function sortStoriesDate(storyList){
    const sortedArray = storyList.sort((a,b) => new Date(b.pubDate) - new Date(a.pubDate));
    return sortedArray
}

function formatStories(story){
    // GET TITLE
    const title = getTitle(story);
    // GET DESCR
    const descr = getDescr(story);
    // GET PUB DATE
    const pubDate = getPubDate(story);
    // GET IMAGE LINK
    const imageURL = getImage(story);
    // GET STORY URL
    const storyURL = getStoryURL(story)
    // CREATE STORY OBJECTS
    let storyObj = {title:title, description:descr, pubDate:pubDate, image:imageURL, storyURL: storyURL}

    return storyObj
}

function getTitle(story){
    try {
        const firstTitle = story.querySelector('title').innerHTML.replace('<![CDATA[','');
        const secondTitle = firstTitle.replace(']]>','').trim();
        return secondTitle;
    } catch(error) {
        const secondTitle = 'none';
        console.log('Title error: ' + error);
        return secondTitle;
    }
}

function getDescr(story){
    try{
        const firstDescr = story.querySelector('description').innerHTML.replace('<![CDATA[','');
        const secondDescr = firstDescr.replace(']]>','').trim();
        return secondDescr;
    } catch(error){
        const secondDescr = 'none';
        console.log('Descr error: ' + error);
        return secondDescr;
    }
}

function getImage(story){
    try {
        const firstImage = story.querySelector('image').innerHTML.replace('<![CDATA[','');
        const secondImage = firstImage.replace(']]>','').trim();
        return secondImage;
    } catch(error){
        const secondImage = 'none';
        console.log('Image error: ' + error)
        return secondImage;
    }
}

function getPubDate(story){
    try {
        const firstDate = story.querySelector('pubDate').innerHTML.replace('<![CDATA[','');
        const secondDate = firstDate.replace(']]>','').trim();
        return secondDate;
    } catch(error){
        const secondDate = 'none';
        console.log('pubDate error:' + error)
        return secondDate;
    }
}

function getStoryURL(story){
    try {
        const firstURL = story.querySelector('link').innerHTML.replace('<![CDATA[','');
        const secondURL = firstURL.replace(']]>','').trim();
        return secondURL;
    } catch(error){
        const secondURL = 'none';
        console.log('URL error:' + error);
        return secondURL;
    }
}
