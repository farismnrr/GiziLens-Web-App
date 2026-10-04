<template>
    <svg
        class="plate-art"
        viewBox="0 0 360 360"
        role="img"
        aria-label="A balanced bowl of vegetables, grains and avocado"
    >
        <defs>
            <radialGradient id="plate">
                <stop stop-color="#ffffff" />
                <stop offset=".75" stop-color="#fcfcf6" />
                <stop offset="1" stop-color="#e4e8da" />
            </radialGradient>
            <linearGradient id="leaf">
                <stop stop-color="#86aa52" />
                <stop offset="1" stop-color="#527d37" />
            </linearGradient>
        </defs>
        <circle cx="180" cy="180" r="176" fill="#f8f9f1" />
        <circle cx="180" cy="180" r="158" fill="url(#plate)" stroke="#dfe5d6" />
        <circle cx="180" cy="180" r="134" fill="#ebefdc" />
        <g fill="url(#leaf)">
            <ellipse cx="105" cy="143" rx="34" ry="61" transform="rotate(-40 105 143)" />
            <ellipse cx="146" cy="104" rx="31" ry="62" transform="rotate(20 146 104)" />
            <ellipse cx="81" cy="190" rx="31" ry="55" transform="rotate(-50 81 190)" />
            <ellipse cx="108" cy="232" rx="28" ry="62" transform="rotate(-35 108 232)" />
            <ellipse cx="164" cy="251" rx="25" ry="53" transform="rotate(45 164 251)" />
        </g>
        <g fill="none" stroke="#aec87b" stroke-width="2">
            <path d="M80 100l59 86M166 58l-29 94M51 161l67 62M80 189l53 93M201 214l-72 80" />
        </g>
        <path d="M167 130q61-67 118 4l-21 83-67 21-48-43z" fill="#ead9a4" />
        <g fill="#d5be85">
            <ellipse cx="184" cy="140" rx="9" ry="4" transform="rotate(30 184 140)" />
            <ellipse cx="207" cy="127" rx="9" ry="4" transform="rotate(-25 207 127)" />
            <ellipse cx="234" cy="140" rx="9" ry="4" />
            <ellipse cx="216" cy="158" rx="9" ry="4" transform="rotate(35 216 158)" />
            <ellipse cx="250" cy="160" rx="9" ry="4" />
            <ellipse cx="186" cy="174" rx="9" ry="4" />
            <ellipse cx="226" cy="185" rx="9" ry="4" transform="rotate(-40 226 185)" />
            <ellipse cx="205" cy="209" rx="9" ry="4" />
            <ellipse cx="258" cy="197" rx="9" ry="4" transform="rotate(25 258 197)" />
        </g>
        <g fill="#d67955" stroke="#edaa87" stroke-width="3">
            <circle cx="136" cy="153" r="21" />
            <circle cx="119" cy="204" r="19" />
            <circle cx="172" cy="225" r="20" />
        </g>
        <g fill="#efbd90">
            <circle cx="131" cy="150" r="4" />
            <circle cx="143" cy="157" r="4" />
            <circle cx="114" cy="200" r="4" />
            <circle cx="124" cy="210" r="4" />
            <circle cx="168" cy="220" r="4" />
            <circle cx="180" cy="229" r="4" />
        </g>
        <g transform="rotate(35 245 252)">
            <path d="M211 209q34-57 69 0c44 76-3 111-35 111s-79-35-34-111z" fill="#45724d" />
            <path d="M219 213q26-41 52 0c33 62 2 96-26 96s-60-34-26-96z" fill="#bfd484" />
            <path d="M230 220q15-25 29 0c21 39 19 72-14 72s-36-33-15-72z" fill="#e0dfa0" />
            <circle cx="245" cy="263" r="23" fill="#9b7050" />
            <circle cx="239" cy="257" r="9" fill="#b28863" />
        </g>
        <g fill="#f4ece0">
            <circle cx="201" cy="92" r="9" />
            <circle cx="221" cy="95" r="10" />
            <circle cx="242" cy="107" r="8" />
            <circle cx="193" cy="111" r="8" />
            <circle cx="215" cy="111" r="8" />
        </g>
        <g fill="#3b6033">
            <circle cx="103" cy="172" r="3" />
            <circle cx="152" cy="117" r="3" />
            <circle cx="169" cy="188" r="3" />
            <circle cx="193" cy="233" r="3" />
        </g>
    </svg>
</template>
