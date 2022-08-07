const helppers = {
    CapitalizeFirstLetter(string) {
        var splitStr = string.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    },
    ScrollToTop() {
        window.scrollTo(0, 0);
    },
    GetId(url) {
        return parseInt(url.split("/")[5]);
    },
    GetAvatar(url) {
        if (url) {
            let itemAvatar = helppers.GetId(url);
            return `https://starwars-visualguide.com/assets/img/characters/${itemAvatar}.jpg`;
        }
        return "";
    }
}

export default helppers;
