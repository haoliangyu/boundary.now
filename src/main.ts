/// <reference path='typings/require.d.ts'/>

import 'leaflet';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'reflect-metadata';

import '@angular/material/core/theming/prebuilt/indigo-pink.css';
import 'font-awesome/css/font-awesome.css';
import 'leaflet/dist/leaflet.css';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import AppModule from './components/app/app.module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
