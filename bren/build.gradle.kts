plugins {
    kotlin("jvm") version "2.3.10"
    kotlin("plugin.jpa") version "2.4.0"

}

group = "org.iglossolalia"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()

}

dependencies {
    testImplementation(kotlin("test"))
    implementation("org.springframework.boot:spring-boot-starter-web:4.1.0")
    implementation("com.h2database:h2:2.4.240")
}

kotlin {
    jvmToolchain(25)
}

tasks.test {
    useJUnitPlatform()
}
