import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventsAppComponent } from './events-app.component'

import { EventsListComponent, EventThumbnailComponent, 
          EventService, EventDetailsComponent, CreateEventComponent, 
          EventRouteActivator, EventListResolver    } from './events/index'

import { NavBarComponent } from './nav/navbar.component';
import { ToastrService } from './common/toastr.service';
import { Error404Component } from './errors/error-404.component';
import { AuthService } from '../app/user/auth.service';
import { appRoutes } from '../app/routes';


export function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')

    return true;
}

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component
  ],
  providers: [ 
    EventService, 
    ToastrService,
    EventListResolver,
    AuthService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    EventRouteActivator
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

