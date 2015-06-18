##!/usr/bin/env bash
#!/bin/bash
clear
rhc app restart whoappbackend
rhc port-forward whoappbackend