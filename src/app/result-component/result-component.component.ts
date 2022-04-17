import { HttpClient } from '@angular/common/http';
import { BirdDetail } from './../BirdDetail.model';
import { ResponseData } from './../ResponseData';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-component',
  templateUrl: './result-component.component.html',
  styleUrls: ['./result-component.component.css']
})
export class ResultComponentComponent implements OnInit {

  @Input() birdData:ResponseData[]=[];
  birdDetail:BirdDetail[] = [];
  fetchingComplete:boolean = false;
  viewDetail:boolean = false;
  detailsForBird!:BirdDetail;
  prob = new Map<String, number>();
  audioMap = new Map<String, String>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //console.log(this.birdData);
    this.makeDic();
    this.createAudioLink()
    this.getBirdsDetail();
  }

  makeDic(){
    for(let item of this.birdData){
      this.prob.set(item.birdName,item.probability);
    }
  }

  getBirdsDetail(){
    var count = 1;
    this.fetchingComplete = false;
    for(var i=0; i<5 ; i++){
      var birdName = this.birdData[i].birdName;
      var link = 'https://aves-detail.herokuapp.com/getDetails/'+birdName;
      //console.log(link);
      
      let response = this.http.get<BirdDetail>(link);
      response.subscribe(
        (data)=>{
          data.probability = this.getProb(data.birdName)
          data.birdName = data.birdName.split('_').join(' ');
          data.audioLink = this.audioMap.get(data.birdName) as String;
          //console.log(data.audioLink);
          
          this.birdDetail.push(data);
          count++;
          this.sortArray();
          if(count==4){
            this.fetchingComplete = true;
            //console.log(this.birdDetail);
          }
        }
      );
    }
  }

  sortArray(){
    this.birdDetail = this.birdDetail.sort((n1,n2) => {
      if (n1.probability > n2.probability) {
          return -1;
      }
      if (n1.probability < n2.probability) {
          return 1;
      }
      return 0;
  });
  }

  getProb(birdName:String):number{
    if(this.prob.get(birdName))
      return this.prob.get(birdName) as number;
    return 0;
  }

  getStyle(p:number):String{
    return "width: "+Math.round(p*100)+"%";
  }

  getProbablity(p:number){
    return Math.round(p*100);
  }

  viewDetails(bird:BirdDetail){
    this.viewDetail = true;
    this.detailsForBird = bird;
  }

  createAudioLink(){
    this.audioMap.set('Black footed Albatross','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/521976');
this.audioMap.set('Laysan Albatross','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/521975');
this.audioMap.set('Sooty Albatross','none');
this.audioMap.set('Groove billed Ani','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/535458');
this.audioMap.set('Crested Auklet','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548776');
this.audioMap.set('Least Auklet','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548768');
this.audioMap.set('Parakeet Auklet','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548765');
this.audioMap.set('Rhinoceros Auklet','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548780');
this.audioMap.set('Brewer Blackbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551210');
this.audioMap.set('Red winged Blackbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551158');
this.audioMap.set('Rusty Blackbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551201');
this.audioMap.set('Yellow headed Blackbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551082');
this.audioMap.set('Bobolink','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551090');
this.audioMap.set('Indigo Bunting','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551701');
this.audioMap.set('Lazuli Bunting','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551696');
this.audioMap.set('Painted Bunting','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551713');
this.audioMap.set('Cardinal','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551661');
this.audioMap.set('Spotted Catbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/538006');
this.audioMap.set('Gray Catbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/543810');
this.audioMap.set('Yellow breasted Chat','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551072');
this.audioMap.set('Eastern Towhee','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551062');
this.audioMap.set('Chuck will Widow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548319');
this.audioMap.set('Brandt Cormorant','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548993');
this.audioMap.set('Red faced Cormorant','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/540993');
this.audioMap.set('Pelagic Cormorant','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/522017');
this.audioMap.set('Bronzed Cowbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/537017');
this.audioMap.set('Shiny Cowbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/534086');
this.audioMap.set('Brown Creeper','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550116');
this.audioMap.set('American Crow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549833');
this.audioMap.set('Fish Crow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549846');
this.audioMap.set('Black billed Cuckoo','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548287');
this.audioMap.set('Mangrove Cuckoo','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548286');
this.audioMap.set('Yellow billed Cuckoo','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548278');
this.audioMap.set('Gray crowned Rosy Finch','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550515');
this.audioMap.set('Purple Finch','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550544');
this.audioMap.set('Northern Flicker','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549372');
this.audioMap.set('Acadian Flycatcher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549468');
this.audioMap.set('Great Crested Flycatcher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549572');
this.audioMap.set('Least Flycatcher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549499');
this.audioMap.set('Olive sided Flycatcher','none');
this.audioMap.set('Scissor tailed Flycatcher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/536848');
this.audioMap.set('Vermilion Flycatcher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/536806');
this.audioMap.set('Yellow bellied Flycatcher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549464');
this.audioMap.set('Frigatebird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/522003');
this.audioMap.set('Northern Fulmar','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548972');
this.audioMap.set('Gadwall','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/544531');
this.audioMap.set('American Goldfinch','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550633');
this.audioMap.set('European Goldfinch','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/527858');
this.audioMap.set('Boat tailed Grackle','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551239');
this.audioMap.set('Eared Grebe','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548241');
this.audioMap.set('Horned Grebe','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548231');
this.audioMap.set('Pied billed Grebe','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548223');
this.audioMap.set('Western Grebe','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548245');
this.audioMap.set('Blue Grosbeak','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551690');
this.audioMap.set('Evening Grosbeak','none');
this.audioMap.set('Pine Grosbeak','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550506');
this.audioMap.set('Rose breasted Grosbeak','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551674');
this.audioMap.set('Pigeon Guillemot','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548751');
this.audioMap.set('California Gull','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548851');
this.audioMap.set('Glaucous winged Gull','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548873');
this.audioMap.set('Heermann Gull','none');
this.audioMap.set('Herring Gull','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/165927');
this.audioMap.set('Ivory Gull','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548798');
this.audioMap.set('Ring billed Gull','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548839');
this.audioMap.set('Slaty backed Gull','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/537599');
this.audioMap.set('Western Gull','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548845');
this.audioMap.set('Anna Hummingbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/535892');
this.audioMap.set('Ruby throated Hummingbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548344');
this.audioMap.set('Rufous Hummingbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/522416');
this.audioMap.set('Green Violetear','none');
this.audioMap.set('Long tailed Jaeger','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548732');
this.audioMap.set('Pomarine Jaeger','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/535305');
this.audioMap.set('Blue Jay','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549761');
this.audioMap.set('Florida Jay','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549778');
this.audioMap.set('Green Jay','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/532609');
this.audioMap.set('Dark eyed Junco','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550821');
this.audioMap.set('Tropical Kingbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/536835');
this.audioMap.set('Gray Kingbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/536843');
this.audioMap.set('Belted Kingfisher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549235');
this.audioMap.set('Green Kingfisher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/536042');
this.audioMap.set('Pied Kingfisher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/540525');
this.audioMap.set('Ringed Kingfisher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/536038');
this.audioMap.set('White breasted Kingfisher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/546452');
this.audioMap.set('Red legged Kittiwake','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/522252');
this.audioMap.set('Horned Lark','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549976');
this.audioMap.set('Pacific Loon','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548946');
this.audioMap.set('Mallard','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548012');
this.audioMap.set('Western Meadowlark','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551102');
this.audioMap.set('Hooded Merganser','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548097');
this.audioMap.set('Red breasted Merganser','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548104');
this.audioMap.set('Mockingbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550317');
this.audioMap.set('Nighthawk','none');
this.audioMap.set('Clark Nutcracker','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549824');
this.audioMap.set('White breasted Nuthatch','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550086');
this.audioMap.set('Baltimore Oriole','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551140');
this.audioMap.set('Hooded Oriole','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551120');
this.audioMap.set('Orchard Oriole','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/544312');
this.audioMap.set('Scott Oriole','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551153');
this.audioMap.set('Ovenbird','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551249');
this.audioMap.set('Brown Pelican','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/535014');
this.audioMap.set('White Pelican','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548997');
this.audioMap.set('Western Wood Pewee','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549450');
this.audioMap.set('Sayornis','none');
this.audioMap.set('American Pipit','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550483');
this.audioMap.set('Whip poor Will','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548326');
this.audioMap.set('Horned Puffin','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548786');
this.audioMap.set('Common Raven','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549855');
this.audioMap.set('White necked Raven','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/545389');
this.audioMap.set('American Redstart','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551413');
this.audioMap.set('Geococcyx','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548273');
this.audioMap.set('Loggerhead Shrike','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549730');
this.audioMap.set('Great Grey Shrike','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/541343');
this.audioMap.set('Baird Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550957');
this.audioMap.set('Black throated Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550765');
this.audioMap.set('Brewer Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550751');
this.audioMap.set('Chipping Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550719');
this.audioMap.set('Clay colored Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550729');
this.audioMap.set('House Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550462');
this.audioMap.set('Field Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550745');
this.audioMap.set('Fox Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550798');
this.audioMap.set('Grasshopper Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550706');
this.audioMap.set('Harris Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550882');
this.audioMap.set('Henslow Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550965');
this.audioMap.set('Le Conte Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550920');
this.audioMap.set('Lincoln Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550987');
this.audioMap.set('Nelson Sharp tailed Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/544286');
this.audioMap.set('Savannah Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550949');
this.audioMap.set('Seaside Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550927');
this.audioMap.set('Song Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550973');
this.audioMap.set('Tree Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550796');
this.audioMap.set('Vesper Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550910');
this.audioMap.set('White crowned Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550860');
this.audioMap.set('White throated Sparrow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550887');
this.audioMap.set('Cape Glossy Starling','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/545744');
this.audioMap.set('Bank Swallow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/543207');
this.audioMap.set('Barn Swallow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550026');
this.audioMap.set('Cliff Swallow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/544745');
this.audioMap.set('Tree Swallow','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550004');
this.audioMap.set('Scarlet Tanager','none');
this.audioMap.set('Summer Tanager','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551633');
this.audioMap.set('Artic Tern','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548921');
this.audioMap.set('Black Tern','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548905');
this.audioMap.set('Caspian Tern','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/535362');
this.audioMap.set('Common Tern','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548917');
this.audioMap.set('Elegant Tern','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548932');
this.audioMap.set('Forsters Tern','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548925');
this.audioMap.set('Least Tern','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/548898');
this.audioMap.set('Green tailed Towhee','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551043');
this.audioMap.set('Brown Thrasher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550281');
this.audioMap.set('Sage Thrasher','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550311');
this.audioMap.set('Black capped Vireo','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549628');
this.audioMap.set('Blue headed Vireo','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549685');
this.audioMap.set('Philadelphia Vireo','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549702');
this.audioMap.set('Red eyed Vireo','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549719');
this.audioMap.set('Warbling Vireo','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549707');
this.audioMap.set('White eyed Vireo','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549635');
this.audioMap.set('Yellow throated Vireo','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549669');
this.audioMap.set('Bay breasted Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551455');
this.audioMap.set('Black and white Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551294');
this.audioMap.set('Black throated Blue Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551489');
this.audioMap.set('Blue winged Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551286');
this.audioMap.set('Canada Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551599');
this.audioMap.set('Cape May Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551427');
this.audioMap.set('Cerulean Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551433');
this.audioMap.set('Chestnut sided Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551474');
this.audioMap.set('Golden winged Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551278');
this.audioMap.set('Hooded Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551406');
this.audioMap.set('Kentucky Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551386');
this.audioMap.set('Magnolia Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551446');
this.audioMap.set('Mourning Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551374');
this.audioMap.set('Myrtle Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/85245');
this.audioMap.set('Nashville Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551342');
this.audioMap.set('Orange crowned Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551325');
this.audioMap.set('Palm Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551497');
this.audioMap.set('Pine Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551508');
this.audioMap.set('Prairie Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551541');
this.audioMap.set('Prothonotary Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551301');
this.audioMap.set('Swainson Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551310');
this.audioMap.set('Tennessee Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551319');
this.audioMap.set('Wilson Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551606');
this.audioMap.set('Worm eating Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551255');
this.audioMap.set('Yellow Warbler','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/536952');
this.audioMap.set('Northern Waterthrush','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551271');
this.audioMap.set('Louisiana Waterthrush','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551262');
this.audioMap.set('Bohemian Waxwing','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550436');
this.audioMap.set('Cedar Waxwing','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550442');
this.audioMap.set('American Three toed Woodpecker','none');
this.audioMap.set('Pileated Woodpecker','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549365');
this.audioMap.set('Red bellied Woodpecker','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549289');
this.audioMap.set('Red cockaded Woodpecker','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549335');
this.audioMap.set('Red headed Woodpecker','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549274');
this.audioMap.set('Downy Woodpecker','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/549312');
this.audioMap.set('Bewick Wren','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550239');
this.audioMap.set('Cactus Wren','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550248');
this.audioMap.set('Carolina Wren','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550231');
this.audioMap.set('House Wren','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550168');
this.audioMap.set('Marsh Wren','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550209');
this.audioMap.set('Rock Wren','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550153');
this.audioMap.set('Winter Wren','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/550195');
this.audioMap.set('Common Yellowthroat','https://cdn.download.ams.birds.cornell.edu/api/v1/asset/551393');
  }

  
}
