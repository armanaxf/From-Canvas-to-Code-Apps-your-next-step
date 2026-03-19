/*
 * Team Asset Register — Main entry point
 *
 * This is the "brain" of your Code App. It's like the App.OnStart in Canvas Apps —
 * this is where everything begins.
 *
 * During the workshop, you'll add data-fetching logic and connect this to your
 * React components.
 */

import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { App } from "./components/App";

export class TeamAssetRegister
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private context: ComponentFramework.Context<IInputs>;
  private notifyOutputChanged: () => void;

  constructor() {
    // Nothing to set up here yet — think of this like a blank App.OnStart
  }

  /**
   * Called when the component is first loaded.
   * This is where you'll fetch your initial data from Dataverse.
   * (Like setting up your data sources in a Canvas App.)
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this.context = context;
    this.notifyOutputChanged = notifyOutputChanged;
  }

  /**
   * Called whenever the component needs to re-render.
   * Think of this like the screen's OnVisible event — it runs every time
   * something changes and the screen needs to update.
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    this.context = context;

    return React.createElement(App, {
      context: this.context,
    });
  }

  /**
   * Returns any data the component wants to send back to the platform.
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Cleanup — called when the component is removed from the page.
   */
  public destroy(): void {
    // Nothing to clean up yet
  }
}
