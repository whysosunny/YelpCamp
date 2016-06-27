var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose");

var campgrounds = [
    {
        name: "Salmon Creek",
        image: "http://onmilwaukee.com/images/articles/ca/camping/camping_fullsize_story1.jpg?20080730123152"
    },
    {
        name: "Veruda Sunset",
        image: "http://oddculture.com/wp-content/uploads/2015/12/Camping-Near-The-Lake-Background-Wallpaper.jpg"
    },
    {
        name: "Monkey Heaven",
        image: "http://geogypsytraveler.com/wp-content/uploads/2013/05/06-641-Vervet-monkey-on-tent-Berg-en-Dal-camp-Kruger-NP-SA-1024x739.jpg"
    },
    {
        name: "Salmon Creek",
        image: "http://onmilwaukee.com/images/articles/ca/camping/camping_fullsize_story1.jpg?20080730123152"
    },
    {
        name: "Veruda Sunset",
        image: "http://oddculture.com/wp-content/uploads/2015/12/Camping-Near-The-Lake-Background-Wallpaper.jpg"
    },
    {
        name: "Monkey Heaven",
        image: "http://geogypsytraveler.com/wp-content/uploads/2013/05/06-641-Vervet-monkey-on-tent-Berg-en-Dal-camp-Kruger-NP-SA-1024x739.jpg"
    },
    {
        name: "Salmon Creek",
        image: "http://onmilwaukee.com/images/articles/ca/camping/camping_fullsize_story1.jpg?20080730123152"
    },
    {
        name: "Veruda Sunset",
        image: "http://oddculture.com/wp-content/uploads/2015/12/Camping-Near-The-Lake-Background-Wallpaper.jpg"
    },
    {
        name: "Monkey Heaven",
        image: "http://geogypsytraveler.com/wp-content/uploads/2013/05/06-641-Vervet-monkey-on-tent-Berg-en-Dal-camp-Kruger-NP-SA-1024x739.jpg"
    }
];

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Nainital",
//         image: "http://www.hostgator.co.in/files/writeable/uploads/hostgator54365/image/_dsc6425.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu eleifend est, vel auctor nisl. Etiam hendrerit sit amet neque eu finibus. Aliquam ullamcorper purus nec dignissim iaculis. Curabitur nibh ipsum, pellentesque tristique elementum et"
//     }, function(err,campground) {
//         if(err) {
//             console.log("Something went wrong " +err);
//         } else {
//             console.log("Campground " +campground.name +" is successfully added!");
//         }
//     }
// );

app.get("/", function(req,res) {
    res.render("landing");
});

app.get("/campgrounds", function(req,res) {
    Campground.find({},function(err,allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("index",{
                campgrounds : allCampgrounds
            });
        }
    });

});

app.post("/campgrounds", function(req,res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {
        name: name,
        image: image,
        description: desc
    };
    Campground.create(newCampground, function(err,campground) {
        if(err) {
            console.log(err);
        } else {
            console.log(campground +" created!");
            res.redirect("/campgrounds");
        }
    });

});

app.get("/campgrounds/new", function(req,res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req,res) {
    var id = req.params.id;
    Campground.findById(id,function(err,foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {
                campground : foundCampground
            });
        }
    });

});


app.listen(3000,function() {
    console.log("YelpCamp server has started at port 3000");
});

