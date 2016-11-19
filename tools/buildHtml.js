import fs from 'fs'; // Used to interact with the file-system
import cheerio from 'cheerio'; // Simple way to handle in-memory DOM using jQuery selectors
import colors from 'colors';

/*eslint-disable no-console*/

fs.readFile('src/index.html', 'utf8', (err, markup) => { // Reads source html
	if (err) {
		return new Error('Could not read source index.html file');
	}

	const $ = cheerio.load(markup); // Creates an in-memory DOM of the source code to then manipulate like jQuery

	// since a seperate speadsheet is only utilized for the production build, need to
	$('head').prepend('<link rel="stylesheet" href="styles.css">'); // Reference head tag and insert link to stylesheet

	fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) { // Write finilized DOM to the dist folder
		if (err) {
			return new Error('Could not write to dist folder');
		}
		console.log('index.html written to /dist'.green);
	});
});
