const matchLinkRegExp = new RegExp("((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)"
+ "\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_"
+ "\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?"
+ "((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+"   // named host
+ "(?:"   // plus top level domain
+ "(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])"
+ "|(?:biz|b[abdefghijmnorstvwyz])"
+ "|(?:cat|com|coop|c[acdfghiklmnoruvxyz])"
+ "|d[ejkmoz]"
+ "|(?:edu|e[cegrstu])"
+ "|f[ijkmor]"
+ "|(?:gov|g[abdefghilmnpqrstuwy])"
+ "|h[kmnrtu]"
+ "|(?:info|int|i[delmnoqrst])"
+ "|(?:jobs|j[emop])"
+ "|k[eghimnrwyz]"
+ "|l[abcikrstuvy]"
+ "|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])"
+ "|(?:name|net|n[acefgilopruz])"
+ "|(?:org|om)"
+ "|(?:pro|p[aefghklmnrstwy])"
+ "|qa"
+ "|r[eouw]"
+ "|s[abcdeghijklmnortuvyz]"
+ "|(?:tel|travel|t[cdfghjklmnoprtvwz])"
+ "|u[agkmsyz]"
+ "|v[aceginu]"
+ "|w[fs]"
+ "|y[etu]"
+ "|z[amw]))"
+ "|(?:(?:25[0-5]|2[0-4]" // or ip address
+ "[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]"
+ "|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]"
+ "[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}"
+ "|[1-9][0-9]|[0-9])))"
+ "(?:\\:\\d{1,5})?)" // plus option port number
+ "(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~"  // plus option query params
+ "\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?"
+ "(?:\\b|$)", "g");

const matchDomain = new RegExp("\\b(?!hack\\.milkhunters\\.ru\\b)((?:https?|ftp)://[^\\s/$.?#].[^\\s]*)\\b", "g"); 

export const findLinksInString = (string) => {
  return !matchDomain.test(string) && matchLinkRegExp.test(string);
};

export const replaceLinksInString = (string, replacement) => {
  return string.replaceAll(matchLinkRegExp, replacement);
};
