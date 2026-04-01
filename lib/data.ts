// ⚠️ STRICT: 7 direct .mp4 sources, exact order, DO NOT change
export const VIDEOS = [
  'https://videos.pexels.com/video-files/18157839/18157839-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/32814977/32814977-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/33293629/33293629-uhd_2560_1440_30fps.mp4',
  'https://videos.pexels.com/video-files/2632737/2632737-uhd_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/7565456/7565456-uhd_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/34857424/34857424-uhd_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/28265381/28265381-uhd_2560_1440_30fps.mp4',
] as const;
export interface SectionCfg{id:number;depth:number;temp:number;psi:number;depthBg:string;rays:boolean;fog:boolean;particles:boolean;abyss:boolean;signature:boolean;}
export const SECTION_CFG: SectionCfg[] = [
  {id:0,depth:0,  temp:22.4,psi:14.7, depthBg:'transparent',         rays:false,fog:false,particles:false,abyss:false,signature:false},
  {id:1,depth:5,  temp:20.1,psi:16.8, depthBg:'rgba(1,10,26,0.18)',  rays:false,fog:false,particles:false,abyss:false,signature:false},
  {id:2,depth:12, temp:18.3,psi:18.9, depthBg:'rgba(1,8,20,0.30)',   rays:false,fog:true, particles:false,abyss:false,signature:false},
  {id:3,depth:40, temp:15.8,psi:71.4, depthBg:'rgba(0,6,16,0.46)',   rays:true, fog:true, particles:true, abyss:false,signature:false},
  {id:4,depth:200,temp:8.4, psi:299.0,depthBg:'rgba(0,3,10,0.76)',   rays:true, fog:true, particles:true, abyss:true, signature:true },
  {id:5,depth:120,temp:10.2,psi:185.0,depthBg:'rgba(0,5,14,0.52)',   rays:true, fog:true, particles:true, abyss:false,signature:false},
  {id:6,depth:800,temp:2.1, psi:1155, depthBg:'rgba(0,3,10,0.65)',   rays:false,fog:true, particles:true, abyss:false,signature:false},
];
export interface ContentSection{id:number;num:string;label:string;title:string[];italic:string;body:string;align:'left'|'center'|'right';stats?:{v:string;k:string}[];pills?:string[];strips?:{v:string;k:string}[];cards?:{icon:string;title:string;body:string}[];cta?:{text:string;gold?:boolean};}
export const SECTIONS: ContentSection[] = [
  {id:0,num:'01',label:'The Ocean Breathes',title:['The','Ocean'],italic:'Breathes',body:'Seventy-one percent of our planet is ocean. It generates half our oxygen, regulates our climate, and sustains all life. Every breath you take began here.',align:'left',stats:[{v:'71%',k:'Earth Covered'},{v:'50%',k:'O₂ Generated'},{v:'3.8B',k:'Years Old'}]},
  {id:1,num:'02',label:'Power of Waves',title:['Raw','Ocean'],italic:'Power',body:"A single wave can carry the energy of thousands of homes. Ancient, unstoppable, eternal — the ocean moves on its own terms.",align:'center'},
  {id:2,num:'03',label:'Beneath The Surface',title:['Surface'],italic:'Tension',body:'The membrane between two worlds. Above: light, air, the familiar. Below: silence, pressure, and something vast beyond imagination.',align:'right',pills:['TEMP: 18.4°C','SALINITY: 3.5%','DEPTH: 0m → ∞']},
  {id:3,num:'04',label:'Into The Depths',title:['Diving','Into'],italic:'Forever',body:'Light dissolves. Pressure rises. Time slows. You are entering the largest inhabited space on Earth — and it does not belong to us.',align:'center',cta:{text:'Begin Descent'}},
  {id:4,num:'05',label:'The Abyss',title:[],italic:'',body:'',align:'center'},
  {id:5,num:'06',label:'Life Below',title:['Life'],italic:'Flourishes',body:'Over 240,000 known species call the ocean home. Scientists believe millions more remain undiscovered — entire civilisations of life, unseen by human eyes.',align:'left',strips:[{v:'240K',k:'Known Species'},{v:'2M+',k:'Estimated Total'},{v:'80%',k:'Unexplored'},{v:'∞',k:'Mysteries'}]},
  {id:6,num:'07',label:'Protect Our Oceans',title:['Protect','What Sustains'],italic:'Us All',body:'The ocean gives life to our world. But pollution, overfishing, and climate change are pushing it past its limits. The time to act is not coming — it is now.',align:'center',cta:{text:'Take Action',gold:true}},
];
