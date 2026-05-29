const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/GeraldMutero/projects/chainafric-frontend/src/translations';

const additions = {
    "en": `
  // Explore Page
  exploreBlockchainData: "Explore Blockchain Data",
  discoverInsights: "Discover insights across multiple chains in a language that makes sense to you.",
  multiChainAnalytics: "Multi-Chain Analytics",
  trackAssets: "Track assets and transactions across Ethereum, BNB Chain, Polygon, and more — all in one place.",
  walletPortfolio: "Wallet Portfolio",
  viewTokenBalances: "View token balances, NFTs, transaction history, and cross-chain activity for any wallet address.",
  languageAccessibility: "Language Accessibility",
  accessBlockchain: "Access blockchain data in major African languages, making Web3 accessible to everyone.",
  contractAnalysis: "Contract Analysis",
  aiPoweredContract: "AI-powered contract auditing and summarization to understand potential risks and opportunities.",
  nftGalleryTitle: "NFT Gallery",
  exploreNftCollections: "Explore NFT collections with detailed metadata and transaction history across marketplaces.",
  airdropTracking: "Airdrop Tracking",
  neverMissAirdrop: "Never miss an airdrop with notifications and tracking for eligible wallets.",
  learnMore: "Learn more",

  // Dashboard Page
  yourDashboard: "Your Dashboard",
  connectToTrack: "Connect your wallet to track your assets and activity",
  connectYourWallet: "Connect Your Wallet",
  connectWeb3Wallet: "Connect your Web3 wallet to view your personalized dashboard",
  connectToViewTokens: "Connect your wallet to view your tokens, NFTs, transaction history and more — all in one place.",
  walletConnected: "Wallet Connected",
  totalBalance: "Total Balance",
  recentTransactionsTitle: "Recent Transactions",
`,
    "sw": `
  // Explore Page
  exploreBlockchainData: "Chunguza Data ya Blockchain",
  discoverInsights: "Gundua maarifa kwenye minyororo mingi kwa lugha inayoeleweka kwako.",
  multiChainAnalytics: "Uchambuzi wa Minyororo Mingi",
  trackAssets: "Fuatilia mali na miamala kwenye Ethereum, BNB Chain, Polygon, na zaidi — zote mahali pamoja.",
  walletPortfolio: "Mkoba wa Pochi",
  viewTokenBalances: "Tazama salio la tokeni, NFTs, historia ya miamala, na shughuli za minyororo kwa anwani yoyote ya pochi.",
  languageAccessibility: "Ufikivu wa Lugha",
  accessBlockchain: "Fikia data ya blockchain katika lugha kuu za Kiafrika, na kufanya Web3 kufikiwa na kila mtu.",
  contractAnalysis: "Uchambuzi wa Mkataba",
  aiPoweredContract: "Ukaguzi wa mkataba unaoendeshwa na AI na muhtasari ili kuelewa hatari na fursa zinazowezekana.",
  nftGalleryTitle: "Matunzio ya NFT",
  exploreNftCollections: "Chunguza mikusanyiko ya NFT na metadata ya kina na historia ya miamala kwenye masoko.",
  airdropTracking: "Ufuatiliaji wa Airdrop",
  neverMissAirdrop: "Usikose kamwe airdrop na arifa na ufuatiliaji kwa pochi zinazostahiki.",
  learnMore: "Jifunze zaidi",

  // Dashboard Page
  yourDashboard: "Dashbodi Yako",
  connectToTrack: "Unganisha pochi yako kufuatilia mali na shughuli zako",
  connectYourWallet: "Unganisha Pochi Yako",
  connectWeb3Wallet: "Unganisha pochi yako ya Web3 ili kuona dashbodi yako iliyobinafsishwa",
  connectToViewTokens: "Unganisha pochi yako kutazama tokeni zako, NFTs, historia ya miamala na zaidi — zote mahali pamoja.",
  walletConnected: "Pochi Imeunganishwa",
  totalBalance: "Jumla ya Salio",
  recentTransactionsTitle: "Miamala ya Hivi Karibuni",
`,
    "zu": `
  // Explore Page
  exploreBlockchainData: "Hlola Idatha Ye-Blockchain",
  discoverInsights: "Zitholele imininingwane kuma-chain amaningi ngolimi oluzwakalayo kuwe.",
  multiChainAnalytics: "Izibalo Zama-chain Amani",
  trackAssets: "Landelela izimpahla nokuthengiselana kuyo yonke i-Ethereum, njll.",
  walletPortfolio: "Iphothifoliyo Yesikhwama",
  viewTokenBalances: "Buka ezilinganisweni zamathokheni, ama-NFT, njll.",
  languageAccessibility: "Ukufinyeleleka Kolimi",
  accessBlockchain: "Finyelela kudatha ye-blockchain ngezilimi ezinkulu zase-Afrika.",
  contractAnalysis: "Ukuhlaziywa Kwenkontileka",
  aiPoweredContract: "Ukucwaningwa kwenkontileka okuxhaswe yi-AI.",
  nftGalleryTitle: "Igalari Ye-NFT",
  exploreNftCollections: "Hlola amaqoqo e-NFT.",
  airdropTracking: "Ukulandelela i-Airdrop",
  neverMissAirdrop: "Ungaphuthelwa yi-airdrop.",
  learnMore: "Funda kabanzi",

  // Dashboard Page
  yourDashboard: "Ideshibhodi Yakho",
  connectToTrack: "Xhuma isikhwama sakho ukulandelela izimpahla zakho.",
  connectYourWallet: "Xhuma Isikhwama Sakho",
  connectWeb3Wallet: "Xhuma isikhwama sakho se-Web3.",
  connectToViewTokens: "Xhuma isikhwama sakho ukuze ubuke amathokheni akho.",
  walletConnected: "Isikhwama Sixhunyiwe",
  totalBalance: "Ibhalansi Eyonke",
  recentTransactionsTitle: "Okwenziwe Kwakamuva",
`,
    "yo": `
  // Explore Page
  exploreBlockchainData: "Ṣawari Blockchain Data",
  discoverInsights: "Ṣawari awọn oye kọja awọn ẹwọn pupọ ni ede rẹ.",
  multiChainAnalytics: "Multi-Chain atupale",
  trackAssets: "Tọpa awọn ohun-ini lori Ethereum ati bẹbẹ lọ.",
  walletPortfolio: "Apamọwọ Portfolio",
  viewTokenBalances: "Wo awọn iṣẹkusẹ.",
  languageAccessibility: "Wiwọle Ede",
  accessBlockchain: "Wiwọle blockchain ni awọn ede Afirika.",
  contractAnalysis: "Ayẹwo Adehun",
  aiPoweredContract: "AI adehun imọ.",
  nftGalleryTitle: "NFT Gallery",
  exploreNftCollections: "Ṣawari NFT gbigba.",
  airdropTracking: "Airdrop Titele",
  neverMissAirdrop: "Maṣe padanu airdrop kan.",
  learnMore: "Kọ ẹkọ diẹ si",

  // Dashboard Page
  yourDashboard: "Dasibodu rẹ",
  connectToTrack: "Sopọ lati tọpa rẹ ohun ini.",
  connectYourWallet: "So apamọwọ rẹ",
  connectWeb3Wallet: "Sopọ rẹ Web3 apamọwọ.",
  connectToViewTokens: "Sopọ rẹ apamọwọ lati wo NFT ati tokens.",
  walletConnected: "Apamọwọ ti a sopọ",
  totalBalance: "Apapọ iwọntunwọnsi",
  recentTransactionsTitle: "Awọn iṣowo to ṣẹṣẹ",
`,
    "ig": `
  // Explore Page
  exploreBlockchainData: "Nyochaa Blockchain Data",
  discoverInsights: "Chọpụta nghọta na ọtụtụ agbụ n'asụsụ gị.",
  multiChainAnalytics: "Nyochaa Ọtụtụ-Chain",
  trackAssets: "Soro akụ na azụmahịa.",
  walletPortfolio: "Akpa Wallet",
  viewTokenBalances: "Lelee itule token, wdg.",
  languageAccessibility: "Inweta Asụsụ",
  accessBlockchain: "Nweta data blockchain na asụsụ Africa.",
  contractAnalysis: "Nyocha Nkwekọrịta",
  aiPoweredContract: "Nkwekọrịta AI.",
  nftGalleryTitle: "Osisi NFT",
  exploreNftCollections: "Chọpụta mkpokọta NFT.",
  airdropTracking: "Nyochaa Airdrop",
  neverMissAirdrop: "Echefula airdrop.",
  learnMore: "Mụtakwuo",

  // Dashboard Page
  yourDashboard: "Dashboard gị",
  connectToTrack: "Jikọọ obere akpa gị iji soro akụ gị",
  connectYourWallet: "Jikọọ obere akpa gị",
  connectWeb3Wallet: "Jikọọ obere akpa Web3 gị",
  connectToViewTokens: "Jikọọ obere akpa gị iji hụ token gị",
  walletConnected: "Ejikọtara obere akpa",
  totalBalance: "Ngụkọta",
  recentTransactionsTitle: "Azụmahịa na-adịbeghị anya",
`,
    "ha": `
  // Explore Page
  exploreBlockchainData: "Bincika Bayanan Blockchain",
  discoverInsights: "Gano basira a fadin sarkoki masu yawa.",
  multiChainAnalytics: "Bincike Multi-Chain",
  trackAssets: "Bi diddigin kadarori.",
  walletPortfolio: "Jakar Wallet",
  viewTokenBalances: "Duba ragowar alama.",
  languageAccessibility: "Samun Harshe",
  accessBlockchain: "Samun damar blockchain a cikin yarenku.",
  contractAnalysis: "Binciken Kwangila",
  aiPoweredContract: "Binciken AI.",
  nftGalleryTitle: "Gidan NFT",
  exploreNftCollections: "Bincika tarin NFT.",
  airdropTracking: "Binciken Airdrop",
  neverMissAirdrop: "Kada ku rasa airdrop.",
  learnMore: "Koyi ƙari",

  // Dashboard Page
  yourDashboard: "Dashbodin ku",
  connectToTrack: "Haɗa walat ɗin ku",
  connectYourWallet: "Haɗa Walat ɗin ku",
  connectWeb3Wallet: "Haɗa walat ɗin Web3 ɗin ku",
  connectToViewTokens: "Haɗa don ganin alamun ku",
  walletConnected: "An haɗa walat",
  totalBalance: "Jimlar Kuɗi",
  recentTransactionsTitle: "Ma'amaloli na baya-bayan nan",
`,
    "am": `
  // Explore Page
  exploreBlockchainData: "የብሎክቼይን ውሂብን ያስሱ",
  discoverInsights: "በበርካታ ሰንሰለቶች ላይ ግንዛቤዎችን ያግኙ።",
  multiChainAnalytics: "ባለብዙ ሰንሰለት ትንታኔ",
  trackAssets: "ንብረቶችን ይከታተሉ።",
  walletPortfolio: "የኪስ ቦርሳ ፖርትፎሊዮ",
  viewTokenBalances: "የቶከን ሂሳቦችን ይመልከቱ።",
  languageAccessibility: "የቋንቋ ተደራሽነት",
  accessBlockchain: "በአፍሪካ ቋንቋዎች ብሎክቼይንን ይድረሱ።",
  contractAnalysis: "የውል ትንተና",
  aiPoweredContract: "በAI የተጎለበተ የውል ትንተና።",
  nftGalleryTitle: "የNFT ማዕከለ-ስዕላት",
  exploreNftCollections: "የNFT ስብስቦችን ያስሱ።",
  airdropTracking: "የAirdrop ክትትል",
  neverMissAirdrop: "አየር ዳሮፕን አያምልጥዎ።",
  learnMore: "ተጨማሪ ይማሩ",

  // Dashboard Page
  yourDashboard: "የእርስዎ ዳሽቦርድ",
  connectToTrack: "ንብረቶችን ለመከታተል ያገናኙ።",
  connectYourWallet: "የኪስ ቦርሳዎን ያገናኙ",
  connectWeb3Wallet: "የWeb3 ቦርሳዎን ያገናኙ",
  connectToViewTokens: "ቶከኖችዎን ለማየት ያገናኙ።",
  walletConnected: "የኪስ ቦርሳ ተገናኝቷል",
  totalBalance: "ጠቅላላ ቀሪ ሂሳብ",
  recentTransactionsTitle: "የቅርብ ጊዜ ግብይቶች",
`,
    "ar": `
  // Explore Page
  exploreBlockchainData: "استكشف بيانات البلوكشين",
  discoverInsights: "اكتشف الرؤى عبر سلاسل متعددة بلغتك.",
  multiChainAnalytics: "تحليلات متعددة السلاسل",
  trackAssets: "تتبع الأصول.",
  walletPortfolio: "محفظة الأصول",
  viewTokenBalances: "عرض أرصدة الرموز.",
  languageAccessibility: "سهولة الوصول اللغوي",
  accessBlockchain: "الوصول إلى بيانات البلوكشين.",
  contractAnalysis: "تحليل العقود",
  aiPoweredContract: "تدقيق العقود المدعوم بالذكاء الاصطناعي.",
  nftGalleryTitle: "معرض NFT",
  exploreNftCollections: "استكشف مجموعات NFT.",
  airdropTracking: "تتبع Airdrop",
  neverMissAirdrop: "لا تفوت أي Airdrop.",
  learnMore: "اعرف المزيد",

  // Dashboard Page
  yourDashboard: "لوحة القيادة الخاصة بك",
  connectToTrack: "قم بتوصيل محفظتك لتتبع الأصول الخاصة بك",
  connectYourWallet: "قم بتوصيل محفظتك",
  connectWeb3Wallet: "قم بتوصيل محفظة Web3 الخاصة بك",
  connectToViewTokens: "قم بتوصيل محفظتك لعرض الرموز الخاصة بك",
  walletConnected: "المحفظة متصلة",
  totalBalance: "إجمالي الرصيد",
  recentTransactionsTitle: "المعاملات الأخيرة",
`
};

const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const lang = file.replace('.ts', '');
    if (additions[lang]) {
        const filepath = path.join(dir, file);
        let content = fs.readFileSync(filepath, 'utf8').trim();
        if (content.endsWith('};')) {
            content = content.slice(0, -2);
        }
        content += additions[lang] + "\\n};\\n";
        fs.writeFileSync(filepath, content, 'utf8');
    }
});
console.log("Done updating dictionaries.");
