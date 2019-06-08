---
lang: fr
author: Antoine Caron
pseudo: slashgear
github_profile: Slashgear
twitter_profile: Slashgear_
canonical: https://slashgear.github.io/posts/kotlin/
title: Kotlin in action
description: Au Mix-IT, j'ai suivi une conférence de Hadi Hariri sur la nouvelle langue Kotlin. Voici mes impressions sur ce langage de programmation.
date: 2016-04-26
hero: ./assets/kotlin.png
tags:
  - kotlin
---

JetBrains, pour les développeurs Java enfermés dans une grotte et ne
connaissant qu’Eclipse, outre le fait de fournir une suite d’outils
pour le développement et un IDE Java (IntelliJ), s’est lancé en 2011
dans la création d’un nouveau langage de programmation. **Plein de
promesses, ce langage, le Kotlin, présenté par Hadi Harriri lors du
Mix-it 2016, m’a fait forte impression.**

Du jeudi 21 au vendredi 22 avril 2016 se tenait à Lyon la sixième
édition du Mix-IT. Rassemblant plus de 600 participants, cette
convention aux allures de grande fête pour développeurs et agilistes
permettaient de suivre talks, ateliers, conférences mais également
d’échanger autour d’une délicieuse crêpe suzette avec des passionnés
venus du monde entier.

En attendant l’article de retour sur le Mix-IT, revenons-en au
sujet principal de cet article, le Kotlin. Ne connaissant alors ce
langage que de nom, j’étais très intrigué par la présentation de
Mr Hadi Harriri nommée “Kotlin : ready for production”. Après une
présentation assez sommaire de l’historique du langage et de l’objectif
du projet de Jetbrains, on comprend assez rapidement qu’en introduisant
le Kotlin, la firme internationale tente de répondre aux besoins des
développeurs Java en rassemblant dans un langage le meilleur du Scala,
des avantages du C#, et une concision poussée à l’extrême. C’est à se
demander si la firme perd espoir en Oracle pour sortir de nouvelles
versions de Java plus ambitieuses.

## La concision ok

Comme je le dis plus haut, la concision était une volonté et un objectif
très clair de Jetbrains pour la création du langage Kotlin. Il est
vrai qu’en Java, on peut très facilement se retrouver à avoir du
Boilerplate un peu partout. On pense aux getter/setter, très verbeux
pour finalement une fonctionnalité qu’on peut résumer habilement.
Évidemment, des plugins comme Lombok permettent par annotation de
réduire tous ce volume de code.

_Afin de vous montrer un exemple de concision, voici une comparaison
entre un objet très simple en Java et l’exact équivalent en Kotlin._

Version Java :

```java
public class Person implements Cloneable{

  private String name;

  private Integer id;

  public Person(String name,Integer id){
    this.name = name;
    this.id = id;
  }

  public String getName(){
    return name;
  }

  public void setName(String name){
    this.name = name;
  }

  public Integer getId(){
    return id;
  }

  public void setId(Integer id){
    this.id = id;
  }
  @Override
  public boolean equals(Object obj) {
    if (obj == this) {
      return true;
    }
    if (obj == null || obj.getClass() != this.getClass()) {
      return false;
    }
    Person guest = (Person) obj;
    return id == guest.id && (name == guest.getName || (name != null && name.equals(guest.getName()))));
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((name == null) ? 0 : name.hashCode());
    result = prime * result + id;
    return result;
  }

  @Override
  public String toString(){
    return"Person(name="+name+",id="+id")";
  }

  @Override
  public Object clone(){
     Person person = null;
	    try {
	      	person = (Person) super.clone();
	    } catch(CloneNotSupportedException cnse) {
	      	cnse.printStackTrace(System.err);
	    }
	    person.name = (String) name.clone();
	    person.id = (Integer) id.clone();
	    return person;
  }
}
```

Version Kotlin :

```kotlin
dat class User(val name: String, val id: Int)
```

Les fonctions venant de Object (toString,equals,..) sont apportées par
le mot clef “data” devant “class” dans le fichier Kotlin.

## Des fonctionnalités intéressantes

Lors de la conférence du Mix-IT, j’ai pu repérer quelques
fonctionnalités qui me semblent réellement intéressantes à vous
partager dans cet article. Cette liste n’est pas exhaustive, mais
devrait vous donnez un aperçu des possibilités.

## Classes

Pour déclarer une classe en Kotlin, on peut se débarrasser des
getter/setter, on peut définir un constructeur principal. En outre,
on peut même définir la mutabilité des attributs de la classe grâce
aux mots clés var (mutable) et val (read-only).

```kotlin
class Person(val firstName: String, val lastName: String, var age: Int) {
  // ...
}
```

## Déclarations de fonction sans accolades (inline)

On peut déclarer des fonctions sans accolades, c’est assez compacte.
On perd un peu en lisibilité mais on gagne en espace.

```kotlin
(fun add(i: Int, j:Int) = i + j)
```

## Des conditions plus simples

Adieu le switch au profit du when avec des “arrow operators”.

```kotlin
when (x) {
  1 -> print("x == 1")
  2 -> print("x == 2")
  else -> { // Note the block
    print("x is neither 1 nor 2")
  }
}
```

Pour les boucles rien de spécial à noter de particulier mais c’est sur l’opération “if” qu’on peut observer un ajout très pratique.

```kotlin
val max = if (a > b) {
    print("Choose a")
    a
  } else {
    print("Choose b")
    b
  }
```

La dernière expression du block if est la valeur du block. On évite
donc l’initialisation de variables en dehors du bloc et évite sa
modification dans chacune des branches. On peut remarquer que
l’opérateur de fin d’instruction ‘;’ disparaît (en réalité
il est optionnel)

## Adieu les “NullPointerException”

Kotlin a été pensé pour éviter les danger des références null et faire
disparaître les NullPointerException et les “null-check”.

```kotlin
var a: String = "abc"
a = null // compilation error
To allow nulls, we can declare a variable as nullable string, written String?:

var b: String? = "abc"
b = null // ok

b?.length
```

On ne peut pas affecter à une variable la valeur null si on n’a pas
délibérément défini cette variable comme nullable. Le Kotlin introduit
également le “call safe operator” qui permet de tester la nullité d’une
variable avant l’appel d’un fonction sur cette variable.

## Des fonctions “Callable”

En Kotlin, une fonction peut être déclarée en dehors d’un objet. Cela
peut paraître étrange vis à vis du Java mais cette fonctionnalité peut
être très pratique, en particulier pour déclarer la fonction main de
son projet.

Une fonction déclarée en dehors d’un objet peut être appelé de
n’importe quel endroit de cette façon :

```kotlin
fun hello(){
  print("hello")
}


fun main(){
  ::hello()
}
```

## La programmation fonctionnelle pour les gouverner tous

Le paradigme fonctionnelle est bien sûr présent dans le langage. Il
permet de réaliser toutes les opérations usuelles (map, reduce,
forEach,etc,..)

```kotlin
var sum = 0
ints.filter { it > 0 }.forEach {
  sum += it
}
print(sum)
```

## Les “Extension Functions”

En Kotlin on peut “étendre” une classe par une fonction de manière
assez simple. On peut donc facilement rajouter des méthodes sans passer
par un héritage.

```kotlin
fun MutableList<Int>.swap(index1: Int, index2: Int) {
  val tmp = this[index1] // 'this' corresponds to the list
  this[index1] = this[index2]
  this[index2] = tmp
}
```

Ici le mot-clé “this” permet d’accéder à l’objet étendu.

## L’interopérabilité

La question soulevée par ce nouveau langage vient assez rapidement.
Peut-on facilement passer de Java à Kotlin? Est-ce que notre code
Kotlin va fonctionner avec tous le code Java que l’on a déjà?
Est-ce que nos outils actuels sont adaptés au développement Kotlin?

## Les IDE

Bien évidemment, JetBrains met ses produits en avant pour
l’utilisation du Kotlin. On peut en effet utiliser leur célèbre IDE
Intellij pour développer dans ce langage. Cerise sur la gâteau, on
peut même utiliser la version Community gratuite pour se faire une
idée. Il existe également un plugin pour Eclipse. Par contre, aucun
projet de plugin n’est en cours pour NetBeans.

## Java

Kotlin permet également une compatibilité avec toutes les
librairies Java, c’est sûrement l’argument le plus fort et évidemment
mis en avant par JetBrains. Le code créé peut donc fonctionner sur une
JVM de la version 6 à 8.

On peut donc profiter de tous les avantages du langage Kotlin tout en
restant 10 ans en arrière coté virtual machine.
Enfin, aucune modification n’est nécessaire pour faire intéragir du
code Java avec du Kotlin. De plus, l’appel de méthode Java est
complètement transparent pour le Kotlin.

## Javascript

Et oui, JetBrains n’a pas voulu ignorer le mouvement récent du
développement Javascript. On peut donc cibler le langage Javascript au
build afin de faire tourner son application Kotlin sur un
environnement NodeJS ou bien dans un navigateur.Cette fonctionnalité
est donc à tester. On tient peut-être ici une alternative au
TypeScript ?… mais ça reste à mes yeux gadget.

## Android

N’ayant fait que quelques Lab Android, je n’ai pas forcément une
vision complète de l’environnement, mais je me souviens avoir été gêné
par le nombre de ligne de code Java nécessaire pour obtenir une si
simple application mobile.

Il se trouve que l’on peut dès aujourd’hui développer des applications
mobiles Android depuis l’IDE recommandé par Google
(i.e: Android Studio) en Kotlin, à tester pour les amateurs.

## Spring Boot

Enfin, on peut voir que le Kotlin intéresse les committers du projet
Spring, notamment le lyonnais Sébastien Deleuze avec cet article
intitulé Developing Spring Boot applications with Kotlin. Voir autant
d’effervescence autour de ce langage rassure un peu, et
personnellement je pense tenter l’utilisation du Kotlin dans le
contexte Spring Boot pour me faire une idée plus objective sur le sujet.

D’ailleurs, le Spring Initializr intègre depuis quelques temps
l’option de génération de projet Spring Boot en Kotlin.

N’hésitez pas à aller tester ce langage sur le site et vous faire
votre propre avis sur ce langage. Quand à moi, je vais rapidement
l’essayer pour un de mes projets.

D’autres ressources sont disponibles sur le Github d’[Hadi Hariri](https://github.com/hhariri/awesome-kotlin)
pourraient vous intéresser
