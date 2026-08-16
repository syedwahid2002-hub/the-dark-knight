// Original Batman content — all prose written for this experience, not copied from external sources.

export interface Villain {
  name: string;
  alias: string;
  description: string;
}

export interface Ally {
  name: string;
  role: string;
  description: string;
}

export interface ArsenalItem {
  name: string;
  description: string;
}

export interface OriginBeat {
  title: string;
  text: string;
}

export const vowQuote: string =
  "I shall become a creature of the night — a shadow that the wicked cannot outrun. I will train my body and my mind until fear answers to me, and I will use it as a weapon against those who feast on the helpless. This is my vow, sworn in the alley where my parents fell, sealed in the silence that followed.";

export const originBeats: OriginBeat[] = [
  {
    title: "The Alley",
    text: "Two gunshots split the Gotham night, and a boy of eight knelt beside the stillness of his parents. The pearls his mother wore scattered across wet cobblestones like a constellation dragged down to earth. In that alley, childhood ended and something colder, sharper, began to take its place.",
  },
  {
    title: "The Vow",
    text: "He stood at the threshold of Wayne Manor with the rain still drying on his coat and made a promise to the dark itself. He would not avenge — he would prevent. He would become the fear that had hollowed him out, and turn it outward, toward every soul that thought the night belonged to them.",
  },
  {
    title: "The Long Apprenticeship",
    text: "For twelve years he vanished into the world's shadows — studying under fugitive masters, learning to read a room by its silence, to break a man without leaving a mark. He learned chemistry from a poisoner, detection from a disgraced inspector, and pain from a thousand rooms he would never speak of again.",
  },
  {
    title: "The Bat",
    text: "He returned to a Gotham that had forgotten his face but not its own rot. Alone in the manor's lowest cellar, he asked himself what shape fear wore — and a bat crashed through the window, answering before he could. He stitched the symbol into cloth, into armor, into the sky itself. The Dark Knight was not born. He was finally let in.",
  },
];

export const villains: Villain[] = [
  {
    name: "The Jester",
    alias: "Architect of Chaos",
    description:
      "A grinning anarchist who treats the city as a stage and its suffering as a punchline. He does not want money or power — he wants to prove that one bad night is all it takes to make anyone laugh the way he does.",
  },
  {
    name: "Dr. Penumbra",
    alias: "The Two-Faced",
    description:
      "Once the city's most idealistic prosecutor, a single acid attack split her into two minds sharing one face. She flips a scarred coin to decide mercy or ruin, and the city has learned to dread the sound of it landing.",
  },
  {
    name: "Dr. Fries",
    alias: "The Frozen Heart",
    description:
      "A cryogenics engineer who watched his wife slip beyond medicine's reach. Now he walks in a suit of sub-zero armor, wielding cold as both weapon and grief, unable to touch anything living without taking it from them.",
  },
  {
    name: "Eddie Nashton",
    alias: "The Riddler",
    description:
      "A self-taught genius who cannot commit a crime without leaving a puzzle behind. He believes intellect is the only true currency, and he is desperate — above all else — to be told he is the cleverest person in any room he enters.",
  },
  {
    name: "Dr. Crane",
    alias: "The Scarecrow",
    description:
      "A former professor of abnormal psychology who decided that fear was not a symptom but a tool. His toxin drags a victim's deepest terror into the open air, and he watches from the corner, notebook in hand, taking notes.",
  },
  {
    name: "Oswald Cobblepot",
    alias: "The Penguin",
    description:
      "A deformed aristocrat who turned his family's ruined name into a criminal empire run from the back room of a nightclub. He speaks in courtesy and conducts business in violence, and never forgets a slight.",
  },
  {
    name: "Selina Kyle",
    alias: "The Cat",
    description:
      "A jewel thief raised in the city's forgotten foster homes, who learned that the world only guards what it values. She and the Bat circle each other — sometimes as enemies, sometimes as something neither will name.",
  },
  {
    name: "Harvey Karlo",
    alias: "Clayface",
    description:
      "A fading film actor whose experimental treatment to save his career melted his body and his mind. He can become anyone he has ever seen, and he uses that gift to take the roles — and the lives — he believes he was denied.",
  },
  {
    name: "Pamela Isley",
    alias: "Poison Ivy",
    description:
      "A botanist betrayed by the man she trusted, who emerged from the toxin with the green world's voice in her blood. She does not hate humanity so much as she has simply decided it is no longer the species worth protecting.",
  },
  {
    name: "Victor Zsasz",
    alias: "The Carver",
    description:
      "A serial killer who marks each life he takes with a single tally carved into his own skin. He believes he is freeing his victims from the prison of living, and he keeps count with the patience of an accountant.",
  },
  {
    name: "Ra's al Ghul",
    alias: "The Demon's Head",
    description:
      "The centuries-old leader of a shadow order who has watched empires rise and rot. He sees Gotham as a wound on the world that must be cauterized, and he has offered the Bat his throne more than once — and meant it.",
  },
  {
    name: "Bane",
    alias: "The Breaker",
    description:
      "Raised from childhood in a prison built for someone else's sin, he forged himself into the only weapon that ever escaped it. He is patient, tactical, and almost gentle in conversation — and he has come to Gotham to prove a point about what cannot be broken.",
  },
];

export const allies: Ally[] = [
  {
    name: "Alfred Pennyworth",
    role: "The Keeper of the House",
    description:
      "Butler, field medic, confessor, and the only living soul who knew the boy before the vow. He keeps the manor standing and keeps the man inside it human, one cup of tea and one quiet rebuke at a time.",
  },
  {
    name: "Commissioner Barbara Gordon",
    role: "The Shield of the GCPD",
    description:
      "Once a vigilante herself, now the only honest cop with the rank to matter. She walks the line between the law and the bat-signal, and she has earned the right to be trusted by both sides of it.",
  },
  {
    name: "Dick Grayson",
    role: "The First Robin",
    description:
      "The boy from the trapeze who became the first to share the vow without being broken by it. He has grown into his own name and his own city, but the manor's lamp is always lit when he comes home.",
  },
  {
    name: "Dr. Leslie Thompkins",
    role: "The Quiet Healer",
    description:
      "A clinic doctor in the Narrows who has stitched up more off-the-books wounds than she will ever record. She does not approve of the mask, but she has never turned it away from her door.",
  },
  {
    name: "Lucius Fox",
    role: "The Architect of the Arsenal",
    description:
      "The quiet engineer who turns a billionaire's grief into a fleet of impossible machines. He asks no questions about where the armor goes at night, and he sleeps well knowing the answer.",
  },
  {
    name: "Tim Drake",
    role: "The Third Robin",
    description:
      "A boy who figured out the secret on his own and asked, not to join, but to keep the Bat from going into the dark alone. His mind is the sharpest weapon in the cave, and it is still growing.",
  },
  {
    name: "Kate Kane",
    role: "The Other Bat",
    description:
      "A former soldier turned vigilante who wears a different shade of the same symbol. She and the Bat do not always agree on method, but they have never once disagreed on what is worth protecting.",
  },
  {
    name: "Harper Row",
    role: "The Signal",
    description:
      "An electrician from the Narrows who built her own suit from salvaged tech and refused to wait for permission. She guards the city in daylight, the hours the Bat cannot reach, and she is proud of every one of them.",
  },
];

export const arsenal: ArsenalItem[] = [
  {
    name: "The Batsuit",
    description:
      "A layered composite of nomex, kevlar, and a ceramic weave light enough to move in and dense enough to stop a rifle round. The cowl's lenses shift spectrum at a whisper, and the cape is memory cloth that stiffens into a glider on current.",
  },
  {
    name: "The Grapple Gun",
    description:
      "A gas-charged launcher that fires a titanium line rated for two tons of pull. It is the sound the city has learned to listen for — a sharp pneumatic bark, then the creak of a cable going taut against the dark.",
  },
  {
    name: "The Batarang",
    description:
      "A weighted throwing blade machined to return on a miss. It is less a weapon than a sentence — it pins, it disarms, it marks — and every rogue in the city has learned to recognize its silhouette in the air.",
  },
  {
    name: "The Batmobile",
    description:
      "A jet-turbine prototype that Lucius Fox never quite finished, finished in the cave instead. It is armored like a tank, quiet as a held breath at idle, and it answers to no key — only to the man who built it.",
  },
  {
    name: "The Utility Belt",
    description:
      "A modular harness of canisters and compartments holding smoke pellets, restraints, a rebreather, a forensic kit, and a dozen contingencies the Bat has never had to use twice. It is the closest thing he carries to a plan.",
  },
  {
    name: "The Batcomputer",
    description:
      "A parallel array humming in the cave's lowest chamber, wired into every public camera and police band in the city. It cross-references a footprint against a thousand case files in the time it takes to ask the question.",
  },
  {
    name: "The Cape",
    description:
      "Memory fabric woven with a conductive mesh that snaps rigid under voltage and falls like silk without it. In the wind it is a glider; in a fight it is a blindfold; in the rain it is the last thing the guilty see.",
  },
  {
    name: "The Smoke Pellet",
    description:
      "A thumb-sized capsule of compressed compound that blooms into a wall of grey in under a second. The Bat does not use it to escape — he uses it to choose the moment the fight begins.",
  },
];
