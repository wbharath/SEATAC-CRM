import { useState, useEffect } from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
const TAC_OPTIONS = [
  'Agrinova-B – Agrinova - Biochar (Collège d’Alma), Alma, QC',
  'Agrinova-PL – Agrinova - Milk Production (Alma College), Alma, QC',
  'AIHUB – AI Hub (Durham College), Oshawa, ON',
  'BCBTAC – BC Beverage Technology Access Centre (Okanagan College), Penticton, BC',
  'BETAC – Building Efficiency Technology Access Centre (Red River College), Winnipeg, MB',
  'BFPS – Boreal Forest Plant & Seed Technology Access Centre (NAIT), Peace River, AB',
  'BPRC – Bio-Industrial Process Research Centre (Lambton College), Sarnia, ON',
  'C2T3 – College Centre for Technology Transfer in Telecommunications (Cégep de Trois-Rivières), Trois-Rivières, QC',
  'CAT-B – Technology Access Centre in Bio-Innovation (La Cité), Ottawa, ON',
  'CAWT – Centre for Advancement of Water and Wastewater Technologies (Fleming College), Lindsay, ON',
  'CDCQ – Composites Development Center of Quebec (Cégep de Saint-Jérôme), Saint-Jérôme, QC',
  'Centre-RISC – Centre de recherche et d’innovation en sécurité civile du Québec (Campus Notre-Dame-de-Foy), Saint-Augustin-de-Desmaures, QC',
  'CERFO – Forestry Education and Research Center (Cégep de Sainte-Foy), Québec, QC',
  'CGQ – Geomatics Centre of Quebec (Cégep de Chicoutimi), Chicoutimi, QC',
  'CIMMI – Centre en imagerie numérique et médias interactifs (Cégep de Sainte-Foy), Québec, QC',
  'CIM-TAC – Centre for Innovation in Manufacturing - Technology Access Centre (Red Deer College), Red Deer, AB',
  'CIRADD – Center for initiation to research and support for sustainable development (Cégep de la Gaspésie et des Îles), Carleton-sur-Mer, QC',
  'CMQ – Québec Metallurgy Centre (Cégep de Trois-Rivières), Trois-Rivières, QC',
  'CNETE – National Center for Electrochemistry and Environmental Technologies (Shawinigan College), Shawinigan, QC',
  'CNP – Applied Research Centre for Natural Products (Loyalist College), Belleville, ON',
  'Coalia – Coalia (Cégep de Thetford), Thetford Mines, QC',
  'CSM – Cambrian College Centre for Smart Mining (Cambrian College), Sudbury, ON',
  'CTA – Aerospace Technology Access Centre (Édouard-Montpetit College), Longueuil, QC',
  'CTAC – Camosun Technology Access Centre (Camosun College), Victoria, BC',
  'Ctéau – Ctéau (Cégep de Saint-Laurent), Montréal, QC',
  'DICE – Digital Integration Centre of Excellence (Saskatchewan Polytechnic), Saskatoon, SK',
  'DTL – Digital Transformation Lab (Lambton College), Ottawa, ON',
  'EPIC – Energy and Power Innovation Centre (Mohawk College), Hamilton, ON',
  'FBIC – Niagara College, Food & Beverage Innovation Centre (Niagara College), Niagara-on-the-Lake, ON',
  'FIRSt – Food Innovation & Research Studio (FIRSt) (George Brown College), Toronto, ON',
  'GBT – Green Building Technologies (SAIT), Calgary, AB',
  'GÉNIElab – GÉNIElab (La Cité), Ottawa, ON',
  'HUPR – Research Centre for Human Potential (ENC), Montréal, QC',
  'IATC – Integrated Agriculture Technology Centre (Lethbridge Polytechnic), Lethbridge, AB',
  'I-CI – Institute for Graphic Communications and Printability (Ahuntsic College), Montréal, QC',
  'IMAR – Innovation maritime (Cégep de Rimouski), Rimouski, QC',
  'INÉDI – Centre en recherche en design industriel (Cégep de Lanaudière à Terrebonne), Terrebonne, QC',
  'Innofibre – Centre for Innovation of Cellulosic Products (Cégep de Trois-Rivières), Trois-Rivières, QC',
  'INNOV – CCNB-INNOV Applied Research (CCNB), Bathurst, NB',
  'INNOVATE – Centre for Arts, Crafts & Technology (Aurora College), Inuvik, NWT',
  'Inovem – Inovem (Cégep de Victoriaville), Victoriaville, QC',
  'IVI – Innovative Vehicle Institute (Cégep de Saint-Jérôme), Saint-Jérôme, QC',
  'Kemitek – Kemitek (Cégep de Thetford), Thetford Mines, QC',
  'LLIO – Living Lab en innovation ouverte (Cégep de Rivière-du-Loup), Rivière-du-Loup, QC',
  'LMIC – Lambton Manufacturing Innovation Centre (Lambton College), Sarnia, ON',
  'MEDIC – mHealth & eHealth Development and Innovation Centre (Mohawk College), Hamilton, ON',
  'Merinov – Merinov (Cégep de la Gaspésie et des Îles), Gaspé, QC',
  'NBDC – National Bee Diagnostic Centre (Grande Prairie Regional College), Beaverlodge, AB',
  'Nergica – Nergica (Cégep de Gaspésie et des Îles), Gaspé, QC',
  'PRK – Prairie Research Kitchen (Red River College Polytechnic), Winnipeg, MB',
  'RAIL – Centre d’expertise ferroviaire RAIL (Cégep de Sept-Îles), Sept-Îles, QC',
  'RCDTAC – Reality Capture & Digitization TAC (College of the North Atlantic), St. John’s, NL',
  'SEATAC – SEATAC (Nova Scotia Community College), Dartmouth, NS',
  'SEREX – SEREX (Cégep de Rimouski), Amqui, QC',
  'SIRT – Screen Industries Research & Training Centre (Sheridan College), Toronto, ON',
  'SMART-Centre – Centre for Smart Manufacturing & Advanced Recycling (Conestoga College), Cambridge, ON',
  'STAC – Selkirk Technology Access Centre (Selkirk College), Trail, BC',
  'TACAM – Technology Access Centre for Aerospace & Manufacturing (Red River College Polytechnic), Winnipeg, MB',
  'TACLP – Technology Access Centre for Livestock Production (Olds College), Olds, AB',
  'TACSM – Technology Access Centre for Sustainable Mining (NAIT), Edmonton, AB',
  'TBT – TransBIOTech (Cégep de Lévis-Lauzon), Lévis, QC'
]

export default function Step3({ data = {} }) {
  // initialize only once from props
  const [knowTAC, setKnowTAC]         = useState(data.knowTAC || '')
  const [selectedTAC, setSelectedTAC] = useState(data.selectedTAC || '')

  return (
    <div className="space-y-6">
      <hr className="border-gray-300" />

      {/* — Yes / No — */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-gray-800">
          I know which TAC I would like to work with?*
        </legend>
        <div className="flex items-center space-x-6">
          {['Yes', 'No'].map((opt) => (
            <label
              key={opt}
              className="flex items-center cursor-pointer"
              onClick={() => setKnowTAC(opt)}
            >
              <input
                type="radio"
                name="knowTAC"
                value={opt}
                checked={knowTAC === opt}
                onChange={() => setKnowTAC(opt)}
                className="form-radio h-4 w-4 text-blue-600"
                required
              />
              <span className="ml-2 text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* — Only show when “Yes” — */}
      {knowTAC === 'Yes' && (
        <label className="block space-y-1">
          <span className="text-sm font-semibold text-gray-800">
            I am interested in working with:*
          </span>
          <select
            name="selectedTAC"
            value={selectedTAC}
            onChange={(e) => setSelectedTAC(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">— Select the TAC you want —</option>
            {TAC_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* hidden fields so your form still serializes these values */}
      <input type="hidden" name="knowTAC" value={knowTAC} />
      {knowTAC === 'Yes' && (
        <input type="hidden" name="selectedTAC" value={selectedTAC} />
      )}
    </div>
  )
}
