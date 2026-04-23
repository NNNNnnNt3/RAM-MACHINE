__Kontrolka procesora:__ <br>
- pokazuje aktualnie robiony program<br>
- zawiera Instruction i Argument<br>
<br>
!Uwaga!<br>
- na początku jest pusty<br>
- przyjmuje tylko liczby całkowite<br>
- jeżeli nazwy będą za długie to ma się pojawić tylko początek zakończony ... <br>
- gdy program zaczyna kolejną instrukcje zaczyna się od poczatku, ale bez robienia się pustym <br>

<br><br>

__Kontrolka pamięci:__<br>
- zawiera Adresem (indeks komórki) i Value (jej zawartość)<br>
- komórka 0 jest akumulatorem (!ma inny kolor niż reszta!)<br>
- jeżeli zawartość jest nie znana to mamy ? oraz inny kolor komórki<br>
- przewijana (!przytrzymanie komórki spowoduje automatyczne przewijanie !)<br>
- wyszukawrkę adressów jako osobne okno gdzie wpisuje się i i przyciska przycisk go aby wyszukał i pierwsza widoczna komórka to będzie ta szukana<br>

<br><br>

__Kontrolka taśmy wejściowej i wyjściowej:__ <br>
- możliwość tylko wprowadzenia do taśmy wejściowej<br>
- wprowadzenie do taśmy wyjściowej ma tylko program<br>
- do nawigacji po tamie służą trzy przyciski: dwa po lewej stronie i jeden po prawej. Pierwszym po lewej przewijamy widok tamy do pierwszej komórki tamy, a pozostałymi przyciskami przewijamy tamś o jedną komórkę w lewo/prawo.<br>
-  tak jak w przypadku przycisków na kontrolce pamięci, dłuższe przyciniącie przycisku spowoduje przewijanie o większą
liczbę komórek, aż do momentu zwolnienia przycisku.<br>
- podczas instrukcji READ i WRITE strzałka się przesuwa na komókęna której wykonuje się operacja oraz przesuwa do komórki na której jest opercaj<br>
<br><br>

__Kontrolka taśmy wejściowej i wyjściowej:__ <br>
- kolumny: LN, Label, Instruction, Argument, Comment, EC, EP<br>
-- LN -> pokazuje numer linii programu<br>
-- Label -> unikalna etykieta dla danej lini (?tu coś jeszcze ale nie wiem jak to działa?)<br>
-- Instruciton -> wpisywanie instrukcji  tu trzeba dać do wyboru !jeżeli jest wpisywany ciąg znakó jest prefiksem jedej z dostępnych instrukcji! (?tu coś jeszcze ale nie wiem jak to działa?)<br>
-- Argument -> służy do podania argumentu instrukcji !jedynie instrukcja HALT tego nie wymaga!<br>
-- Comment -> kolumna tekstowa w której można wpisać dowolny tekst, głownie jak o komętar do programu <br>
-- EC i EP -> (?nie wiemy czy robić?)<br><br>

-- skruty kalwiszowe i przemieszczanie -> (?nie wiemy czy robić?)<br>
<br><br>

__Animacje:__<br>

<br><br>

__Elementy które działaja równo że sobą:__<br>
- kontrola procesora i kontrola pamięci jeżeli program działa w kontroli procesora ma pokazane które aktualnie robione i w kontroli pamięci też pokazuje które się robi<br>


<br><br>


__JavaScript:__ <br>
- przyciski na taśmach wejścia i wyjścia, kontrolka pamięci<br>
- działąnie strzałki na taśmach
