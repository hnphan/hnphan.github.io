/* ---------- the other question types ----------
   Every real quote, fact and price below comes from a published source (src). Wrong options are ours, and the
   reveal says so. Her quotes are only ones the press reported her saying. We never invent a "real" one. */

// What did she say? [product, pack, real quote, [our made-up lines], source]
const QUOTES=[
 ['Pistachio, matcha & raspberry chia pudding','pot','It not only looks amazing, it also tastes delicious and it’s got 9.3g of fibre in every pot',
   ['Three superfoods walk into a pot. Nobody walks out.','It’s green, it’s pink, it’s basically a personality','I’ve named my fibre intake after this pot'],'Newswav, Nov 2026'],
 ['Tiramisu iced cream cake','cake','Literally everything you love about a tiramisu but in an ice cream format',
   ['It’s tiramisu that went to finishing school','Italy rang. They want to know how we did it.','Cold, coffee-ish and frankly dangerous'],'Newswav, Nov 2026'],
 ['Chunked ’n loaded malt & caramel cookie','cookie','It’s toasty and biscuity',
   ['It’s crunchy, munchy and a bit Sunday afternoon','It’s what a hug would taste like if hugs were malted','It’s chunky, it’s loaded, it’s my cardio'],'Newswav, Nov 2026'],
 ['The Everything Pasta Sauce','jar','The perfect base for every single tomato sauce',
   ['A sauce so versatile it has a LinkedIn','The only sauce you’ll ever need, until next week’s sauce','Pour it on pasta. Pour it on pizza. Pour it on your problems.'],'Newswav, Oct 2026'],
 ['Pistachio & Parmigiano Reggiano pesto','jar','Not only is it delicious with one of our plain pastas, but also on top of salmon',
   ['Basil? Don’t know her. Pistachio’s in charge now.','Stir it, spread it, eat it off a spoon at midnight','It’s pesto, but it’s been on a gap year'],'Newswav, Oct 2026'],
 ['12 chocolate liqueurs','box','These are definitely going in my husband’s stocking this year',
   ['Hide these from the kids. And the in-laws. And yourself.','Nothing says Christmas like a chocolate with ID','Twelve chocolates, twelve days, zero self-control'],'Newswav, Oct 2026']
];
// Finish the line: [prompt with ___, answer, [our wrong options], source, pack]
const LINES=[
 ['“Hi, I’m Kathryn Turner, Director of ___ at M&S Food.”','Product Development',['Picky Bits','Biscuit Diplomacy','Foodhall Vibes'],'Her video opener','phone'],
 ['Her hashtag: #Kathryn___ItOff','Signed',['Baked','Taste-Tested','Snuck'],'MLP Law, Nov 2026','phone'],
 ['Her first post: “share my hidden ___ in the M&S Foodhall”','gems',['snacks','crumbs','treasures'],'Her first TikTok, May 2026','phone'],
 ['She called the cornflake cookies “delicious” and her “___ yet”','best',['boldest','crunchiest','naughtiest'],'Newswav, Nov 2026','cookie'],
 ['On the chocolate liqueurs: “These are a bit of a ___ for me”','blast from the past',['guilty pleasure','Christmas tradition','weekday breakfast'],'Newswav, Oct 2026','box']
];
// True or false: [statement, true?, explanation, source]
const FACTS=[
 ['She joined M&S in 1995, from Mars.',true,'True. 27 years in product development before she got the top job.','Grocery Gazette, 2022'],
 ['Nigella Lawson is one of her followers.',true,'True. So is Ian Wright.','City AM, 2026'],
 ['Dressing up as her was a hit Halloween costume this year.',true,'True. Blonde wig, glasses, a bag of cookies.','City AM, 2026'],
 ['Some shoppers queued over an hour for the cornflake cookies.',true,'True. Staff were handing bags straight to people.','LADbible, Nov 2026'],
 ['She hit 50,000 followers in less than a month.',true,'True. Her account only started in May.','HelloPartner, Jun 2026'],
 ['Analysts credited her with M&S food sales jumping 10.7% in a month.',true,'True. Data firm NIQ said so, for the four weeks to October.','City AM, 2026'],
 ['She has shown viewers how to prepare a pomelo.',true,'True. Rambutans and kumquats too.','Strong Female Lead, 2026'],
 ['She has been made a dame for services to biscuits.',false,'False. Fans keep asking, though.','Strong Female Lead, 2026'],
 ['Her first video was filmed on a yacht.',false,'False. It was outside an M&S store, in M&S clothes.','Strong Female Lead, 2026'],
 ['She joined M&S in 2021.',false,'False. It was 1995.','Grocery Gazette, 2022'],
 ['She started posting in January 2026.',false,'False. It was May.','HelloPartner, Jun 2026'],
 ['Her job title is Head of Biscuits.',false,'False. Director of Product Development. Biscuits are just a bonus.','Grocery Gazette, 2022']
];
// Price check: [product, pack, price in pence, source]
const PRICES=[
 ['Tiramisu iced cream cake','cake',1400,'Newswav, Nov 2026'],
 ['12 chocolate liqueurs','box',1200,'Newswav, Oct 2026'],
 ['Cold-pressed immunity shot','bottle',475,'Newswav, Nov 2026'],
 ['Pistachio, matcha & raspberry chia pudding','pot',340,'Newswav, Nov 2026'],
 ['Chunked ’n loaded malt & caramel cookie','cookie',210,'Newswav, Nov 2026'],
 ['Apple & custard crumble pot','pot',250,'Newswav, Nov 2026'],
 ['Giant chocolate-coated custard cream (270g)','bar',500,'GB News, Apr 2026'],
 ['Five chocolate & cornflake cookies','cookie',325,'The Week, Nov 2026']
];
