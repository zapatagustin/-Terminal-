{
  description = "Terminal";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    goflake.url = "github:sagikazarmark/go-flake";
    goflake.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { self, nixpkgs, flake-utils, goflake, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;

          overlays = [ goflake.overlay ];
        };
        buildDeps = with pkgs; [ git gnumake ];
        devDeps = with pkgs; buildDeps ++ [
        # dev utilities
        nodePackages_latest.typescript-language-server
        nodePackages_latest."@angular/cli"
        docker-compose

        # languages
        nodejs_20
        ];
      in
      { devShell = pkgs.mkShell { buildInputs = devDeps; }; });
}
