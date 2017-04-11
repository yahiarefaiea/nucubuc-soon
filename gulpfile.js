//  LOAD PACKAGES
var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    pkg = require('./package.json'),
    banner = require('gulp-banner'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    babel = require('gulp-babel'),
    stylus = require('gulp-stylus'),
    koutoSwiss = require('kouto-swiss'),
    
    //  DIRECTORIES
    root = 'application',
    dest = 'release',
    assets = 'includes',
    file = 'nuc',
    min = 'lite',
    mails = 'mails',
    css = 'stylesheets',
    js = 'javascripts',
    img = 'images',
    font = 'fonts',
    webfonts = 'webfonts',
    
    //  BANNER COMMENT
    comment =
      '/*\n'+
      ' *  <%= pkg.name %> <%= pkg.version %>\n'+
      ' *  <%= pkg.description %>\n'+
      ' *  <%= pkg.url %>\n'+
      ' *  \n'+
      ' *  Last update on: <%= new Date().getUTCFullYear() %>/'+
      '<%= new Date().getUTCMonth()+1 %>/<%= new Date().getUTCDate() %>\n'+
      ' *  ©<%= new Date().getFullYear() %> <%= pkg.author %>. all rights reserved.\n'+
      //  ' *  Released under the <%= pkg.license %> license.\n'+
      ' */\n\n';


//  DELETE
gulp.task('del', function() {
  return del.sync(dest);
});


//  BROWSER SYNC
gulp.task('browserSync', function() {
  browserSync({server: {baseDir: dest}});
});


//  PUG
gulp.task('pug-en', function() {
  return gulp.src(root+'/pug/public/*.pug')
    .pipe(pug({
      pretty: true,
      data: {
        root: JSON.parse(require('fs').readFileSync(root+'/data/en/root.json')),
        soon: JSON.parse(require('fs').readFileSync(root+'/data/en/soon.json')),
        newsletter: JSON.parse(require('fs').readFileSync(root+'/data/en/newsletter.json'))
      }
     }))
    .pipe(gulp.dest(dest));
});
gulp.task('pug-ar', function() {
  return gulp.src(root+'/pug/public/*.pug')
    .pipe(pug({
      pretty: true,
      data: {
        root: JSON.parse(require('fs').readFileSync(root+'/data/ar/root.json')),
        soon: JSON.parse(require('fs').readFileSync(root+'/data/ar/soon.json')),
        newsletter: JSON.parse(require('fs').readFileSync(root+'/data/ar/newsletter.json'))
      }
     }))
    .pipe(gulp.dest(dest+'/ar'));
});
gulp.task('pug', function() {
  runSequence(['pug-en', 'pug-ar']);
});
gulp.task('mails-en', function() {
  return gulp.src(root+'/pug/mails/*.pug')
    .pipe(pug({
      pretty: true,
      data: {
        root: JSON.parse(require('fs').readFileSync(root+'/data/en/root.json')),
        mails: JSON.parse(require('fs').readFileSync(root+'/data/en/mails.json'))
      }
     }))
    .pipe(gulp.dest(dest+'/'+mails));
});
gulp.task('mails-ar', function() {
  return gulp.src(root+'/pug/mails/*.pug')
    .pipe(pug({
      pretty: true,
      data: {
        root: JSON.parse(require('fs').readFileSync(root+'/data/ar/root.json')),
        mails: JSON.parse(require('fs').readFileSync(root+'/data/ar/mails.json'))
      }
     }))
    .pipe(gulp.dest(dest+'/ar/'+mails));
});
gulp.task('mails', function() {
  runSequence(['mails-en', 'mails-ar']);
});


//  BABEL
var babelSrc = [
  root+'/babel/lib/jquery-2.2.4.js',
  root+'/babel/lib/jpreloader.js',
  
  root+'/babel/molecules/loader.js',
  
  root+'/babel/templates/soon.js'
];
gulp.task('babel-en', function() {
  return gulp.src(babelSrc)
    .pipe(babel())
    .pipe(concat(file+'.js'))
    .pipe(banner(comment, {pkg:pkg}))
    .pipe(gulp.dest(dest+'/'+assets+'/'+js))
    
    .pipe(uglify())
    .pipe(banner(comment, {pkg:pkg}))
    .pipe(rename({extname:'.'+min+'.js'}))
    .pipe(gulp.dest(dest+'/'+assets+'/'+js));
});
gulp.task('babel-ar', function() {
  return gulp.src(babelSrc)
    .pipe(babel())
    .pipe(concat(file+'.js'))
    .pipe(banner(comment, {pkg:pkg}))
    .pipe(gulp.dest(dest+'/ar/'+assets+'/'+js))
    
    .pipe(uglify())
    .pipe(banner(comment, {pkg:pkg}))
    .pipe(rename({extname:'.'+min+'.js'}))
    .pipe(gulp.dest(dest+'/ar/'+assets+'/'+js));
});
gulp.task('babel', function() {
  runSequence(['babel-en', 'babel-ar']);
});


//  STYLUS
gulp.task('stylus-en', function() {
  return gulp.src(root+'/stylus/app-ltr.styl')
    .pipe(stylus({'use': koutoSwiss()}))
    .pipe(banner(comment, {pkg:pkg}))
    .pipe(rename(file+'.css'))
    .pipe(gulp.dest(dest+'/'+assets+'/'+css))
    
    .pipe(uglifycss())
    .pipe(banner(comment, {pkg:pkg}))
    .pipe(rename({extname:'.'+min+'.css'}))
    .pipe(gulp.dest(dest+'/'+assets+'/'+css));
});
gulp.task('stylus-ar', function() {
  return gulp.src(root+'/stylus/app-rtl.styl')
    .pipe(stylus({'use': koutoSwiss()}))
    .pipe(banner(comment, {pkg:pkg}))
    .pipe(rename(file+'.css'))
    .pipe(gulp.dest(dest+'/ar/'+assets+'/'+css))
    
    .pipe(uglifycss())
    .pipe(banner(comment, {pkg:pkg}))
    .pipe(rename({extname:'.'+min+'.css'}))
    .pipe(gulp.dest(dest+'/ar/'+assets+'/'+css));
});
gulp.task('webfonts-en', function() {
  return gulp.src(root+'/stylus/webfonts.styl')
    .pipe(stylus())
    .pipe(uglifycss())
    .pipe(rename({basename: webfonts, extname:'.'+min+'.css'}))
    .pipe(gulp.dest(dest+'/'+assets+'/'+css));
});
gulp.task('webfonts-ar', function() {
  return gulp.src(root+'/stylus/webfonts.styl')
    .pipe(stylus())
    .pipe(uglifycss())
    .pipe(rename({basename: webfonts, extname:'.'+min+'.css'}))
    .pipe(gulp.dest(dest+'/ar/'+assets+'/'+css));
});
gulp.task('stylus', function() {
  runSequence(['stylus-en', 'stylus-ar', 'webfonts-en', 'webfonts-ar']);
});


//  FONTS
gulp.task('fonts-en', function() {
  return gulp.src(root+'/font/**/*')
    .pipe(gulp.dest(dest+'/'+assets+'/'+font));
});
gulp.task('fonts-ar', function() {
  return gulp.src(root+'/font/**/*')
    .pipe(gulp.dest(dest+'/ar/'+assets+'/'+font));
});
gulp.task('fonts', function() {
  runSequence(['fonts-en', 'fonts-ar']);
});


//  IMAGES
gulp.task('img-en', function() {
  return gulp.src(root+'/img/**/*')
    .pipe(gulp.dest(dest+'/'+assets+'/'+img));
});
gulp.task('img-ar', function() {
  return gulp.src(root+'/img/**/*')
    .pipe(gulp.dest(dest+'/ar/'+assets+'/'+img));
});
gulp.task('img', function() {
  runSequence(['img-en', 'img-ar']);
});


//  HTACCESS
gulp.task('htaccess', function() {
  return gulp.src('.htaccess')
    .pipe(gulp.dest(dest));
});


//  WATCH
gulp.task('watch', function() {
  //  gulp.watch([root+'/pug/**/*', root+'/data/**/*'], ['pug', 'mails', browserSync.reload]);
  //  gulp.watch(root+'/babel/**/*', ['babel', browserSync.reload]);
  //  gulp.watch(root+'/stylus/**/*', ['stylus', browserSync.reload]);
  //  gulp.watch(root+'/font/**/*', ['fonts', browserSync.reload]);
  //  gulp.watch(root+'/img/**/*', ['img', browserSync.reload]);
  gulp.watch([root+'/pug/**/*', root+'/data/**/*'], ['pug-en', 'mails-en', browserSync.reload]);
  gulp.watch(root+'/babel/**/*', ['babel-en', browserSync.reload]);
  gulp.watch(root+'/stylus/**/*', ['stylus-en', 'webfonts-en', browserSync.reload]);
  gulp.watch(root+'/font/**/*', ['fonts-en', browserSync.reload]);
  gulp.watch(root+'/img/**/*', ['img-en', browserSync.reload]);
});


//  DEFAULT
gulp.task('default', function() {
  //  runSequence(['del', 'pug', 'mails', 'babel', 'stylus', 'fonts', 'img', 'browserSync', 'watch']);
  runSequence(['del', 'pug-en', 'mails-en', 'babel-en', 'stylus-en', 'webfonts-en', 'fonts-en', 'img-en', 'browserSync', 'watch']);
});


//  RELEASE
gulp.task('release', function() {
  //  runSequence(['del', 'pug', 'mails', 'babel', 'stylus', 'fonts', 'img', 'htaccess']);
  runSequence(['del', 'pug-en', 'mails-en', 'babel-en', 'stylus-en', 'webfonts-en', 'fonts-en', 'img-en', 'htaccess']);
});