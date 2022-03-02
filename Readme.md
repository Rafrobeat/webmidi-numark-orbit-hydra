![Numark ORBIT](orbit_inhands.jpg)

[![¿Cómo funcion el Numark ORBIT con Hydra?](https://img.youtube.com/vi/aOqPXORkESE/0.jpg)](https://www.youtube.com/watch?v=aOqPXORkESE "¿Cómo funcion el Numark ORBIT con Hydra")


# webMidi para usar Numark Orbit con Hydra

** Esta implementación surge de la pregunta sobre las posibilidades de usar webMidi en diferentes controladores midi para usar con hydra, aunque en teoría se puede usar con cualquier proyecto webMidi.

**MIDI: Musical Instrument Digital Interface**<br>
MIDI es un estándar tecnológico que describe un protocolo, una interfaz digital y conectores que permiten que varios instrumentos musicales electrónicos, ordenadores y otros dispositivos relacionados se conecten y comuniquen entre sí.

**HYDRA**<br>
Conjunto de herramientas para la codificación en vivo de imágenes en red. Inspiradas en los sintetizadores modulares analógicos, estas herramientas son una exploración del uso de la transmisión por Internet para enrutar fuentes y salidas de video en tiempo real.

Hydra usa múltiples framebuffers para permitir mezclar, componer y colaborar dinámicamente entre flujos visuales de navegador conectados. Las transformaciones de coordenadas y colores se pueden aplicar a cada salida a través de funciones encadenadas.

Nota: experimental/en desarrollo.

Para obtener más información, consulte la introducción, el pdf de introducción, los tutoriales y ejemplos, la lista completa de funciones, la galería de bocetos generados por los usuarios o una charla sobre las motivaciones para crear Hydra.

**webMidi**<br>
El objeto MIDIMessageEvent que recibimos contiene mucha información, pero lo que más nos interesa es la matriz de datos. Esta matriz normalmente contiene tres valores (por ejemplo, [144, 72, 64]). El primer valor nos dice qué tipo de comando se envió, el segundo es el valor de la nota y el tercero es la velocidad. El tipo de comando podría ser "nota activada", "nota desactivada", controlador (como pitch bend o pedal de piano) o algún otro tipo de evento exclusivo del sistema ("sysex") único para ese dispositivo/fabricante.

A los efectos de esta implementación, solo nos centraremos en identificar correctamente los mensajes de "nota activada" y "nota desactivada". Aquí están los conceptos básicos:

Un valor de comando de 144 significa un evento de "nota on", y 128 normalmente significa un evento de "nota off".

Los valores de las notas están en un rango de 0 a 127, de menor a mayor. Por ejemplo, la nota más baja en un piano de 88 teclas tiene un valor de 21 y la nota más alta es 108. Una "do central" es 60.
Los valores de velocidad también se dan en un rango de 0 a 127 (de menor a mayor). La velocidad de "nota activada" más suave posible es 1.

Una velocidad de 0 a veces se usa junto con un valor de comando de 144 (que generalmente representa "nota on") para indicar un mensaje de "nota off", por lo que es útil verificar si la velocidad dada es 0 como una forma alternativa de interpretar un mensaje de "nota off".

**Referencias:**

* https://github.com/hydra-synth/hydra

* https://github.com/hydra-synth/hydra/blob/main/docs/midi.md

* https://www.w3.org/TR/webmidi/

* https://www.midi.org/specifications-old/item/table-2-expanded-messages-list-status-bytes

* https://css-tricks.com/dip-your-toes-into-hardware-with-webmidi/

* https://github.com/Athaphian/web-midi-launchpad

* Video para configurar los colores apenas arranca el controlador, se puede en los 4 canales (Pad Bank)

[![¿Cómo configurar los colores iniciales del Numark ORBIT?](https://img.youtube.com/vi/wd5Pv-2h9xs/0.jpg)](https://www.youtube.com/watch?v=wd5Pv-2h9xs "¿Cómo configurar los colores iniciales del Numark ORBIT?")

https://www.youtube.com/watch?v=wd5Pv-2h9xs

* Diagrama MIDI Numark ORBIT

![MIDI Numark ORBIT](numark_orbit_basic_midi.jpg)

**Generalidades:**

- Se debe correr el código en la consola del navegador donde se vaya a usar hydra.


- Se pueden usar los 64 pads (16 por pad bank) tanto para la carga de videos como para la ejecución de código. El acelerómetro en X y Y se puede usar de acuerdo a la función que se defina en los pads.
